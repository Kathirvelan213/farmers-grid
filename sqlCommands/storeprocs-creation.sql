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
     SELECT sp.id,p.id AS productId,p.name,p.description,p.imageUrl,sp.unitPrice
     FROM SellerProducts sp
	 JOIN Products p ON sp.productId=p.id
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





 ALTER PROC usp_GetRetailerRequests( 
     @userId AS NVARCHAR(450)
)
 AS
 BEGIN
     SELECT rr.id,p.id AS productId,p.name,p.description,p.imageUrl,rr.unitPrice
     FROM RetailerRequests rr
	 JOIN Products p ON rr.productId=p.id
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

CREATE PROC usp_CreateNewChat(
	@user1Id AS NVARCHAR(450),
	@user2Id AS NVARCHAR(450)
)
AS
BEGIN
	INSERT INTO Conversations(user1,user2)
	VALUES(@user1Id,@user2Id);
END
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

CREATE PROC usp_GetSellers(
	@userId AS NVARCHAR(450)
)
AS
BEGIN
	SELECT u.id,u.userName,u.email,u.phoneNumber,ms.sellerId
	FROM AspNetUsers u
	JOIN MatchScores ms ON ms.sellerId=u.Id
	WHERE ms.retailerId=@userId;
END;
GO
ALTER PROC usp_GetRetailers(
	@userId AS NVARCHAR(450)
)
AS
BEGIN
	SELECT u.id,u.userName,u.email,u.phoneNumber,ms.retailerId,ud.latitude,ud.longitude
	FROM AspNetUsers u
	JOIN MatchScores ms ON ms.retailerId=u.Id
	JOIN UserDetails ud ON u.id=ud.id
	WHERE ms.sellerId=@userId;
END;
GO

--to be changed to get more details
ALTER PROC usp_GetUserDetails(
@userId AS NVARCHAR(450)
)
AS 
BEGIN
	SELECT u.id,u.userName,u.email,u.phoneNumber,ur.roleId,r.Name AS role,ud.latitude,ud.longitude
	FROM AspNetUsers u
	JOIN AspNetUserRoles ur ON u.id=ur.UserId
	JOIN AspNetRoles r ON ur.RoleId=r.Id
	JOIN UserDetails ud ON u.id=ud.id
	WHERE u.id=@userId;
END;
GO

EXEC usp_GetUserDetails @userId='9fe0c1aa-6789-4e13-a881-780c841ab5c1';

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
		WITH nearyByUsersRawValue AS(
			SELECT 
				u.id, 
				(
					cos(radians(@user_lat)) * cos(radians(u.latitude)) *
					cos(radians(u.longitude) - radians(@user_lng)) +
					sin(radians(@user_lat)) * sin(radians(u.latitude))
				) AS rawValue
			FROM UserDetails u
			JOIN AspNetUserRoles r
			ON u.id=r.UserId
			WHERE 
				u.latitude BETWEEN @user_lat - @lat_range AND @user_lat + @lat_range
				AND u.longitude BETWEEN @user_lng - @lng_range AND @user_lng + @lng_range
				AND r.RoleId=@retailerGUID
		),
		nearByUsers AS(
			SELECT 
				id,
				6371 * ACOS(
					CASE 
						WHEN rawValue > 1 THEN 1
						WHEN rawValue < -1 THEN -1
						ELSE rawValue
					END) AS distance_km
			FROM nearyByUsersRawValue
		)
		INSERT INTO MatchScores(retailerId,sellerId,matchedProductCount,productMatchScoreForSeller,productMatchScoreForRetailer,priceMatchScore,distance,distanceScore,totalMatchScoreForSeller,totalMatchScoreForRetailer)
		SELECT id,@userId,0,0,0,0,distance_km,((@distanceThreshold-distance_km)/@distanceThreshold)*100,0,0
		FROM nearByUsers
		WHERE distance_km <= @distanceThreshold 
		AND NOT EXISTS (
        SELECT 1 FROM MatchScores ms
        WHERE ms.sellerId = @userId
          AND ms.retailerId = nearByUsers.id
    );
    END
    ELSE IF @role = 'RETAILER'
    BEGIN
		WITH nearyByUsersRawValue AS(
			SELECT 
				u.id, 
				(
					cos(radians(@user_lat)) * cos(radians(u.latitude)) *
					cos(radians(u.longitude) - radians(@user_lng)) +
					sin(radians(@user_lat)) * sin(radians(u.latitude))
				) AS rawValue
			FROM UserDetails u
			JOIN AspNetUserRoles r
			ON u.id=r.UserId
			WHERE 
				u.latitude BETWEEN @user_lat - @lat_range AND @user_lat + @lat_range
				AND u.longitude BETWEEN @user_lng - @lng_range AND @user_lng + @lng_range
				AND r.RoleId=@sellerGUID
		),
		nearByValues AS(
			SELECT 
				id,
				6371 * ACOS(
					CASE 
						WHEN rawValue > 1 THEN 1
						WHEN rawValue < -1 THEN -1
						ELSE rawValue
					END) AS distance_km
				FROM nearyByUsersRawValue
		)
		INSERT INTO MatchScores(retailerId,sellerId,matchedProductCount,productMatchScoreForSeller,productMatchScoreForRetailer,priceMatchScore,distance,distanceScore,totalMatchScoreForSeller,totalMatchScoreForRetailer)
		SELECT @userId,id,0,0,0,0,distance_km,((@distanceThreshold-distance_km)/@distanceThreshold)*100,0,0
		FROM nearByValues
		WHERE distance_km <= @distanceThreshold
		AND NOT EXISTS (
        SELECT 1 FROM MatchScores ms
        WHERE ms.retailerId = @userId
          AND ms.sellerId = nearByValues.id
    );
    END
	
		
END
GO

ALTER PROC usp_RefreshMatchScores(
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
			MAX(spc.sellerProductsCount) AS sellerProductsCount,
			MAX(rpc.retailerProductsCount) AS retailerProductsCount,
			(100 - (ABS(SUM(sp.unitPrice) - SUM(rr.unitPrice)) * 100.0)/ NULLIF((SUM(sp.unitPrice) + SUM(rr.unitPrice)) / 2.0, 0))/100.0 AS neutralPriceMatchScore

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
				productMatchScoreForSeller=CAST(su.matchedProductCount AS FLOAT)/ NULLIF(su.sellerProductsCount, 0),
				productMatchScoreForRetailer=CAST(su.matchedProductCount AS FLOAT)/NULLIF(su.retailerProductsCount,0),
				priceMatchScore=
				CASE 
					WHEN su.neutralPriceMatchScore<0 THEN 0
					ELSE su.neutralPriceMatchScore
				END,
				totalMatchScoreForSeller=su.neutralPriceMatchScore*distanceScore*(CAST(su.matchedProductCount AS FLOAT)/NULLIF(su.sellerProductsCount,0)),
				totalMatchScoreForRetailer=su.neutralPriceMatchScore*distanceScore*(CAST(su.matchedProductCount AS FLOAT)/NULLIF(su.retailerProductsCount,0))
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
			MAX(spc.sellerProductsCount) AS sellerProductsCount,
			MAX(rpc.retailerProductsCount) AS retailerProductsCount,
			(100 - (ABS(SUM(sp.unitPrice) - SUM(rr.unitPrice)) * 100.0)/ NULLIF((SUM(sp.unitPrice) + SUM(rr.unitPrice)) / 2.0, 0))/100.0 AS neutralPriceMatchScore

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
				productMatchScoreForSeller=CAST(su.matchedProductCount AS FLOAT)/ NULLIF(su.sellerProductsCount, 0),
				productMatchScoreForRetailer=CAST(su.matchedProductCount AS FLOAT)/NULLIF(su.retailerProductsCount,0),
				priceMatchScore=
				CASE 
					WHEN su.neutralPriceMatchScore<0 THEN 0
					ELSE su.neutralPriceMatchScore
				END,
				totalMatchScoreForSeller=su.neutralPriceMatchScore*distanceScore*(CAST(su.matchedProductCount AS FLOAT)/NULLIF(su.sellerProductsCount,0)),
				totalMatchScoreForRetailer=su.neutralPriceMatchScore*distanceScore*(CAST(su.matchedProductCount AS FLOAT)/NULLIF(su.retailerProductsCount,0))
			FROM MatchScores ms
			JOIN ScoreUpdates su
			ON ms.sellerId=su.sellerId 
				AND ms.retailerId=su.retailerId;
    END
END;
GO

ALTER PROC usp_GetMatchScoresForSellers(
	@userId AS NVARCHAR(450)
)
AS
BEGIN
	SELECT id,
    sellerId,
    retailerId,
    matchedProductCount,
    productMatchScoreForSeller,
    productMatchScoreForRetailer,
    priceMatchScore,
    distance,
    distanceScore,
    totalMatchScoreForSeller,
    totalMatchScoreForRetailer
	FROM MatchScores
	WHERE sellerId=@userId;
END
GO

ALTER PROC usp_GetMatchScoresForRetailers(
	@userId AS NVARCHAR(450)
)
AS
BEGIN
	SELECT id,
    sellerId,
    retailerId,
    matchedProductCount,
    productMatchScoreForSeller,
    productMatchScoreForRetailer,
    priceMatchScore,
    distance,
    distanceScore,
    totalMatchScoreForSeller,
    totalMatchScoreForRetailer
	FROM MatchScores
	WHERE retailerId=@userId;
END
GO

EXEC usp_GetMatchScoresForSellers @userId="9fe0c1aa-6789-4e13-a881-780c841ab5c1";
usp_InsertBlankMatchRecords @userId="9fe0c1aa-6789-4e13-a881-780c841ab5c1";
EXEC usp_GetSellerProducts @userId="9fe0c1aa-6789-4e13-a881-780c841ab5c1";

EXEC usp_UpdateSellerProduct @id=21,@unitPrice=100.3;

usp_GetMessages @chatId=1;


--Requests
CREATE PROC usp_CreateRequest
    @SenderId NVARCHAR(450),
    @ReceiverId NVARCHAR(450),
    @SenderType VARCHAR(20)
AS
BEGIN
    INSERT INTO Requests (SenderId, ReceiverId, SenderType, CreatedAt)
    VALUES (@SenderId, @ReceiverId, @SenderType, SYSDATETIME());

    SELECT SCOPE_IDENTITY() AS RequestId;
END;
GO

CREATE PROC usp_AddRequestItem
    @RequestId INT,
    @ProductId INT,
    @OfferedPrice DECIMAL(10,2)
AS
BEGIN
    INSERT INTO RequestItems (RequestId, ProductId, OfferedPrice)
    VALUES (@RequestId, @ProductId, @OfferedPrice);

    SELECT * FROM RequestItems WHERE RequestId = @RequestId;
END;
GO
CREATE PROC usp_GetRequestsForUser
    @UserId NVARCHAR(450)
AS
BEGIN
    SELECT 
        r.Id AS RequestId,
        r.SenderId, s.UserName AS SenderName,
        r.ReceiverId, rcv.UserName AS ReceiverName,
        r.Status, r.SenderType, r.CreatedAt
    FROM Requests r
    JOIN AspNetUsers s ON s.Id = r.SenderId
    JOIN AspNetUsers rcv ON rcv.Id = r.ReceiverId
    WHERE r.SenderId = @UserId OR r.ReceiverId = @UserId
    ORDER BY r.CreatedAt DESC;
END;
GO

CREATE PROC usp_GetRequestDetails
    @RequestId INT
AS
BEGIN
    SELECT 
        r.Id AS RequestId,
        r.SenderId, s.UserName AS SenderName,
        r.ReceiverId, rcv.UserName AS ReceiverName,
        r.Status, r.SenderType, r.CreatedAt
    FROM Requests r
    JOIN AspNetUsers s ON s.Id = r.SenderId
    JOIN AspNetUsers rcv ON rcv.Id = r.ReceiverId
    WHERE r.Id = @RequestId;

    SELECT 
        ri.Id AS ItemId, ri.ProductId, p.name AS ProductName, ri.OfferedPrice
    FROM RequestItems ri
    JOIN Products p ON p.id = ri.ProductId
    WHERE ri.RequestId = @RequestId;
END;
GO
CREATE PROC usp_UpdateRequestStatus
    @RequestId INT,
    @Status VARCHAR(20)
AS
BEGIN
    UPDATE Requests
    SET Status = @Status
    WHERE Id = @RequestId;

    SELECT * FROM Requests WHERE Id = @RequestId;
END;
GO


CREATE PROC usp_CreateTransaction
    @RequestId INT,
    @DeliveryOption VARCHAR(30)
AS
BEGIN
    INSERT INTO Transactions (RequestId, DeliveryOption, CreatedAt)
    VALUES (@RequestId, @DeliveryOption, SYSDATETIME());

    SELECT SCOPE_IDENTITY() AS TransactionId;
END;
GO

CREATE PROC usp_GetTransactionsForUser
    @UserId NVARCHAR(450)
AS
BEGIN
    SELECT 
        t.Id AS TransactionId,
        r.Id AS RequestId,
        r.SenderId, s.UserName AS SenderName,
        r.ReceiverId, rcv.UserName AS ReceiverName,
        p.name AS ProductName,
        r.OfferedPrice,
        t.DeliveryOption,
        t.TransportStatus,
        t.CreatedAt AS TransactionDate
    FROM Transactions t
    JOIN Requests r ON r.Id = t.RequestId
    JOIN AspNetUsers s ON s.Id = r.SenderId
    JOIN AspNetUsers rcv ON rcv.Id = r.ReceiverId
    JOIN Products p ON p.id = r.ProductId
    WHERE r.SenderId = @UserId OR r.ReceiverId = @UserId
    ORDER BY t.CreatedAt DESC;
END;
GO

