 use [db-market-access-local];
 
 CREATE PROC usp_GetProducts
 AS
 BEGIN 
 SELECT id,name,description,imageUrl
 FROM products;
 END;

 ALTER PROC usp_GetSellerProducts( 
     @userId AS NVARCHAR(450) )
 AS
 BEGIN
     SELECT id,productId,unitPrice
     FROM SellerProducts
     WHERE sellerId=@userId;
 END;
 GO

 ALTER PROC usp_InsertSellerProduct(
     @userId AS NVARCHAR(450),
     @productId AS INT,
     @unitPrice AS FLOAT
 )
 AS
 BEGIN
     INSERT INTO SellerProducts 
     VALUES(@userId,@productId,@unitPrice);

     SELECT SCOPE_IDENTITY() as InsertedId;
 END;
 GO

CREATE PROC usp_DeleteSellerProduct(
    @id AS INT
)
AS
BEGIN
    DELETE FROM SellerProducts
    WHERE id=@id;
END;
GO

CREATE PROC usp_UpdateSellerProduct(
@id AS INT,
@unitPrice AS FLOAT
)
AS 
BEGIN
UPDATE SellerProducts
SET UnitPrice=@unitPrice
WHERE id=@id;
END;
GO





 CREATE PROC usp_GetRetailerRequests( 
     @userId AS NVARCHAR(450) )
 AS
 BEGIN
     SELECT id,productId,unitPrice
     FROM RetailerRequests
     WHERE retailerId=@userId;
 END;
 GO

 CREATE PROC usp_InsertRetailerRequest(
     @userId AS NVARCHAR(450),
     @productId AS INT,
     @unitPrice AS FLOAT
 )
 AS
 BEGIN
     INSERT INTO RetailerRequests 
     VALUES(@userId,@productId,@unitPrice);

     SELECT SCOPE_IDENTITY() as InsertedId;
 END;
 GO

CREATE PROC usp_DeleteRetailerRequest(
    @id AS INT
)
AS
BEGIN
    DELETE FROM RetailerRequests
    WHERE id=@id;
END;
GO

CREATE PROC usp_UpdateRetailerRequest(
@id AS INT,
@unitPrice AS FLOAT
)
AS 
BEGIN
UPDATE RetailerRequests
SET UnitPrice=@unitPrice
WHERE id=@id;
END;
GO




ALTER PROC usp_GetConversations(
	@userId AS NVARCHAR(450)
)
AS 
BEGIN
	SELECT a.id, a.otherUserId ,b.UserName AS otherUserName
	FROM(
		SELECT id,
			CASE	
				WHEN user1=@userId THEN user2
				ELSE user1
			END AS otherUserId
		FROM Conversations
		WHERE user1=@userId OR user2=@userId) a
	JOIN AspNetUsers b
	ON a.otherUserId=b.id;
END;
GO

ALTER PROC usp_GetMessages(
	@chatId AS INT
)
AS
BEGIN
	SELECT id, chatId,senderId,message,timestamp,readStatus,deliveryStatus 
	FROM Messages
	WHERE chatId=@chatId;
END;
GO

ALTER PROC usp_GetUnreadMessageCount(
	@userId AS NVARCHAR(450)
)
AS
BEGIN
	SELECT Count(*)
	FROM Messages
	WHERE senderId=@userId AND readStatus=1;
END;
GO

ALTER PROC usp_InsertMessage(
	@chatId AS INT,
	@senderId AS NVARCHAR(450),
	@message AS NVARCHAR(500),
	@timestamp AS DATETIME2(3),
	@readStatus AS INT,
	@deliveryStatus AS INT
)
AS 
BEGIN
	INSERT INTO Messages( chatId,senderId,message,timestamp,readStatus,deliveryStatus )
	VALUES (@chatId,@senderId,@message,@timestamp,@readStatus,@deliveryStatus );

	SELECT SCOPE_IDENTITY() as InsertedId;

END;
GO

ALTER PROC usp_GetUsers(
	@role AS NVARCHAR(256)
)
AS
BEGIN
	SELECT u.id,u.userName,u.email,u.phoneNumber,ur.roleId
	FROM AspNetUsers u
	JOIN AspNetUserRoles ur
	ON u.id=ur.UserId AND ur.RoleId=(SELECT Id FROM AspNetRoles WHERE NormalizedName=UPPER(@role));
END;
GO

--to be changed to get more details
CREATE PROC usp_GetUserDetails(
@userId AS NVARCHAR(450)
)
AS 
BEGIN
	SELECT u.id,u.userName,u.email,u.phoneNumber,r.roleId
	FROM AspNetUsers u
	JOIN AspNetUserRoles r
	ON u.id=r.UserId
	WHERE u.id=@userId;
END;
GO

CREATE PROC usp_InsertInitialUserDetails(
@userId AS NVARCHAR(450),
@latitude AS FLOAT,
@longitude AS FLOAT
)
AS
BEGIN
	INSERT INTO UserDetails (id,latitude,longitude)
	VALUES (@userId,@latitude,@longitude);
END;
GO

ALTER PROC usp_InsertBlankMatchRecords(
	@userId AS NVARCHAR(450)
)
AS
BEGIN
	DECLARE @distanceThreshold FLOAT=25;
    DECLARE @role NVARCHAR(256);
    SELECT @role = NormalizedName 
	FROM AspNetUserRoles ur 
	JOIN AspNetRoles r 
	ON ur.RoleId=r.Id
	WHERE ur.UserId = @userId;

	DECLARE @user_lat FLOAT;
	DECLARE @user_lng FLOAT;

	SELECT @user_lat=latitude, @user_lng=longitude
	FROM UserDetails
	WHERE id=@userId;

	DECLARE @lat_range FLOAT = 0.225;
	DECLARE @lng_range FLOAT = 0.225;

	DECLARE @sellerGUID NVARCHAR(450);
	DECLARE @retailerGUID NVARCHAR(450);

	SELECT @sellerGUID=Id
	FROM AspNetRoles
	WHERE NormalizedName='SELLER';

	SELECT @retailerGUID=Id
	FROM AspNetRoles
	WHERE NormalizedName='RETAILER';

    IF @role = 'SELLER'
	BEGIN
		WITH nearyByUsers AS(
			SELECT 
				u.id, 
				6371 * acos(
					cos(radians(@user_lat)) * cos(radians(u.latitude)) *
					cos(radians(u.longitude) - radians(@user_lng)) +
					sin(radians(@user_lat)) * sin(radians(u.latitude))
				) AS distance_km
			FROM UserDetails u
			JOIN AspNetUserRoles r
			ON u.id=r.UserId
			WHERE 
				u.latitude BETWEEN @user_lat - @lat_range AND @user_lat + @lat_range
				AND u.longitude BETWEEN @user_lng - @lng_range AND @user_lng + @lng_range
				AND RoleId=@retailerGUID
		) 
		INSERT INTO MatchScores(retailerId,sellerId,matchedProductCount,productMatchScoreForSeller,productMatchScoreForRetailer,priceMatchScore,distance,distanceScore,totalMatchScore)
		SELECT id,@userId,0,0,0,0,distance_km,((@distanceThreshold-distance_km)/@distanceThreshold)*100,0
		FROM nearyByUsers
		WHERE distance_km <= @distanceThreshold 
		AND NOT EXISTS (
        SELECT 1 FROM MatchScores 
        WHERE sellerId = @userId
          AND retailerId = id
    );
    END
    ELSE IF @role = 'RETAILER'
    BEGIN
		WITH nearyByUsers AS(
			SELECT 
				u.id, 
				6371 * acos(
					cos(radians(@user_lat)) * cos(radians(u.latitude)) *
					cos(radians(u.longitude) - radians(@user_lng)) +
					sin(radians(@user_lat)) * sin(radians(u.latitude))
				) AS distance_km
			FROM UserDetails u
			JOIN AspNetUserRoles r
			ON u.id=r.UserId
			WHERE 
				u.latitude BETWEEN @user_lat - @lat_range AND @user_lat + @lat_range
				AND u.longitude BETWEEN @user_lng - @lng_range AND @user_lng + @lng_range
				AND RoleId=@sellerGUID
		) 
		INSERT INTO MatchScores(retailerId,sellerId,matchedProductCount,productMatchScoreForSeller,productMatchScoreForRetailer,priceMatchScore,distance,distanceScore,totalMatchScore)
		SELECT @userId,id,0,0,0,0,distance_km,((@distanceThreshold-distance_km)/@distanceThreshold)*100,0
		FROM nearyByUsers
		WHERE distance_km <= @distanceThreshold
		AND NOT EXISTS (
        SELECT 1 FROM MatchScores 
        WHERE retailerId = @userId
          AND sellerId = id
    );
    END
	
		
END
GO

CREATE PROC usp_RefreshMatchScores(
	@userId AS NVARCHAR(450)
)
AS
BEGIN
    DECLARE @role NVARCHAR(256);
    SELECT @role = NormalizedName 
	FROM AspNetUserRoles ur 
	JOIN AspNetRoles r 
	ON ur.RoleId=r.Id
	WHERE ur.UserId = @userId;

	DECLARE @sellerGUID NVARCHAR(450);
	DECLARE @retailerGUID NVARCHAR(450);

	SELECT @sellerGUID=Id
	FROM AspNetRoles
	WHERE NormalizedName='SELLER';

	SELECT @retailerGUID=Id
	FROM AspNetRoles
	WHERE NormalizedName='RETAILER';

    IF @role = 'SELLER'
	BEGIN
		WITH sellerProductsCount AS(
			SELECT sellerId,COUNT(*) AS sellerProductsCount
			FROM SellerProducts
			GROUP BY sellerId),
		retailerProductsCount AS(
			SELECT retailerId,COUNT(*) AS retailerProductsCount
			FROM RetailerRequests
			GROUP BY retailerId),
		ScoreUpdates AS(
			SELECT 
			ms.sellerId,
			ms.retailerId,
			COUNT(*) AS matchedProductCount,
			spc.sellerProductsCount,
			rpc.retailerProductsCount,
			100 - (ABS(SUM(sp.unitPrice) - SUM(rr.unitPrice)) * 100.0)/ NULLIF((SUM(sp.unitPrice) + SUM(rr.unitPrice)) / 2.0, 0) AS neutralPriceMatchScore

			FROM MatchScores ms
			JOIN SellerProducts sp ON ms.sellerId=sp.sellerId
			JOIN RetailerRequests rr ON ms.retailerId = rr.retailerId
				AND sp.productId=rr.productId
			JOIN sellerProductsCount spc ON sp.sellerId=spc.sellerId
			JOIN retailerProductsCount rpc ON rr.retailerId=rpc.retailerId
			WHERE ms.sellerId=@userId
			GROUP BY ms.retailerId,ms.sellerId)

			UPDATE MatchScores
			SET 
				matchedProductCount=su.matchedProductCount,
				productMatchScoreForSeller=su.matchedProductCount/ NULLIF(su.sellerProductsCount, 0),
				productMatchScoreForRetailer=su.matchedProductCount/NULLIF(su.retailerProductsCount,0),
				priceMatchScore=
				CASE 
					WHEN su.neutralPriceMatchScore<0 THEN 0
					WHEN su.neutralPriceMatchScore > 100 THEN 100
					ELSE su.neutralPriceMatchScore
				END,
				totalMatchScoreForSeller=su.neutralPriceMatchScore*distanceScore*(su.matchedProductCount/NULLIF(su.sellerProductsCount,0)),
				totalMatchScoreForRetailer=su.neutralPriceMatchScore*distanceScore*(su.matchedProductCount/NULLIF(su.retailerProductsCount,0))
			FROM MatchScores ms
			JOIN ScoreUpdates su
			ON ms.sellerId=su.sellerId 
				AND ms.retailerId=su.retailerId;
    END
    ELSE IF @role = 'RETAILER'
    BEGIN
		WITH sellerProductsCount AS(
			SELECT sellerId,COUNT(*) AS sellerProductsCount
			FROM SellerProducts
			GROUP BY sellerId),
		retailerProductsCount AS(
			SELECT retailerId,COUNT(*) AS retailerProductsCount
			FROM RetailerRequests
			GROUP BY retailerId),
		ScoreUpdates AS(
			SELECT 
			ms.sellerId,
			ms.retailerId,
			COUNT(*) AS matchedProductCount,
			spc.sellerProductsCount,
			rpc.retailerProductsCount,
			100 - (ABS(SUM(sp.unitPrice) - SUM(rr.unitPrice)) * 100.0)/ NULLIF((SUM(sp.unitPrice) + SUM(rr.unitPrice)) / 2.0, 0) AS neutralPriceMatchScore

			FROM MatchScores ms
			JOIN SellerProducts sp ON ms.sellerId=sp.sellerId
			JOIN RetailerRequests rr ON ms.retailerId = rr.retailerId
				AND sp.productId=rr.productId
			JOIN sellerProductsCount spc ON sp.sellerId=spc.sellerId
			JOIN retailerProductsCount rpc ON rr.retailerId=rpc.retailerId
			WHERE ms.retailerId=@userId
			GROUP BY ms.retailerId,ms.sellerId)

			UPDATE MatchScores
			SET 
				matchedProductCount=su.matchedProductCount,
				productMatchScoreForSeller=su.matchedProductCount/ NULLIF(su.sellerProductsCount, 0),
				productMatchScoreForRetailer=su.matchedProductCount/NULLIF(su.retailerProductsCount,0),
				priceMatchScore=
				CASE 
					WHEN su.neutralPriceMatchScore<0 THEN 0
					WHEN su.neutralPriceMatchScore > 100 THEN 100
					ELSE su.neutralPriceMatchScore
				END,
				totalMatchScoreForSeller=su.neutralPriceMatchScore*distanceScore*(su.matchedProductCount/NULLIF(su.sellerProductsCount,0)),
				totalMatchScoreForRetailer=su.neutralPriceMatchScore*distanceScore*(su.matchedProductCount/NULLIF(su.retailerProductsCount,0))
			FROM MatchScores ms
			JOIN ScoreUpdates su
			ON ms.sellerId=su.sellerId 
				AND ms.retailerId=su.retailerId;
    END
END;
GO

usp_InsertBlankMatchRecords @userId="9fe0c1aa-6789-4e13-a881-780c841ab5c1";
EXEC usp_GetSellerProducts @userId="9fe0c1aa-6789-4e13-a881-780c841ab5c1";

EXEC usp_UpdateSellerProduct @id=21,@unitPrice=100.3;

usp_GetMessages @chatId=1;