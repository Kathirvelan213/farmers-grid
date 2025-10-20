 use [db-market-access-local]
 
 CREATE TABLE Products(
     id INT PRIMARY KEY IDENTITY(1,1),
     name VARCHAR(100) NOT NULL,
     description VARCHAR(MAX),
     imageUrl VARCHAR(MAX)
 );

select * from SellerProducts;


 CREATE TABLE SellerProducts(
     id INT PRIMARY KEY IDENTITY(1,1),
     sellerId NVARCHAR(450) FOREIGN KEY REFERENCES AspNetUsers(id),
     productId INT FOREIGN KEY REFERENCES Products(id),
     unitPrice FLOAT
 );
 

 CREATE TABLE Conversations(
	id INT PRIMARY KEY IDENTITY(1,1),
	user1 NVARCHAR(450) FOREIGN KEY REFERENCES AspNetUsers(id),
	user2 NVARCHAR(450) FOREIGN KEY REFERENCES AspNetUsers(id)
	)

	DROP TABLE Messages;
CREATE TABLE Messages(
	id INT PRIMARY KEY IDENTITY(1,1),
	chatId INT FOREIGN KEY REFERENCES Conversations(id),
	senderId NVARCHAR(450) FOREIGN KEY REFERENCES AspNetUsers(id),
	message NVARCHAR(500),
	timestamp DATETIME2(3),
	readStatus INT,
	deliveryStatus INT
	);

CREATE TABLE UserDetails(
	id NVARCHAR(450) PRIMARY KEY FOREIGN KEY REFERENCES AspNetUsers(id),
	latitude FLOAT,
	longitude FLOAT
);


 CREATE TABLE RetailerRequests(
     id INT PRIMARY KEY IDENTITY(1,1),
     retailerId NVARCHAR(450) FOREIGN KEY REFERENCES AspNetUsers(id),
     productId INT FOREIGN KEY REFERENCES Products(id),
     unitPrice FLOAT,
 );
 --DROP table MatchScores;
 CREATE TABLE MatchScores(
    id INT PRIMARY KEY IDENTITY(1,1),
    retailerId NVARCHAR(450) FOREIGN KEY REFERENCES AspNetUsers(id),
    sellerId NVARCHAR(450) FOREIGN KEY REFERENCES AspNetUsers(id),
	matchedProductCount INT,
	productMatchScoreForSeller FLOAT,
	productMatchScoreForRetailer FLOAT,
	priceMatchScore FLOAT,
	distance FLOAT,
	distanceScore FLOAT,
	totalMatchScoreForSeller FLOAT,
	totalMatchScoreForRetailer FLOAT,
);

CREATE TABLE Requests (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SenderId NVARCHAR(450) NOT NULL,      -- FK -> AspNetUsers(Id)
    ReceiverId NVARCHAR(450) NOT NULL,    -- FK -> AspNetUsers(Id)
    Status VARCHAR(20) DEFAULT 'pending',  -- pending / accepted / rejected / cancelled
    SenderType VARCHAR(20) NOT NULL,       -- 'farmer' or 'buyer'
    CreatedAt DATETIME2 DEFAULT SYSDATETIME(),

    CONSTRAINT FK_Requests_Sender FOREIGN KEY (SenderId) REFERENCES AspNetUsers(Id),
    CONSTRAINT FK_Requests_Receiver FOREIGN KEY (ReceiverId) REFERENCES AspNetUsers(Id)
);
CREATE TABLE RequestItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RequestId INT NOT NULL,                -- FK -> Requests(Id)
    ProductId INT NOT NULL,                -- FK -> Products(id)
    OfferedPrice DECIMAL(10,2) NOT NULL,

    CONSTRAINT FK_RequestItems_Request FOREIGN KEY (RequestId) REFERENCES Requests(Id),
    CONSTRAINT FK_RequestItems_Product FOREIGN KEY (ProductId) REFERENCES Products(id)
);

CREATE TABLE Transactions (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RequestId INT NOT NULL,
    DeliveryOption VARCHAR(30),   -- 'self' or 'platform_transport'
    TransportStatus VARCHAR(20) DEFAULT 'pending',
    CreatedAt DATETIME2 DEFAULT SYSDATETIME(),
    FOREIGN KEY (RequestId) REFERENCES Requests(Id)
);