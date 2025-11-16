-- SCHEDULE TABLE
CREATE TABLE Schedule (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    request_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    frequency INT NOT NULL DEFAULT 0, -- Example values: Daily, Weekly, Monthly
    status VARCHAR(20) DEFAULT 'Active', -- Example values: Active, Paused, Ended
    created_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (request_id) REFERENCES Requests(Id)
);

-- PICKUP TABLE
CREATE TABLE Pickup (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    schedule_id INT NOT NULL,
    pickup_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Scheduled', -- Scheduled, Completed, Missed
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (schedule_id) REFERENCES Schedule(Id)
);

-- PICKUP ITEMS TABLE
CREATE TABLE PickupItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    pickup_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (pickup_id) REFERENCES Pickup(Id),
    FOREIGN KEY (product_id) REFERENCES Products(Id)
);


-- Transportation Stored Procedures
CREATE PROC usp_CreateSchedule
    @RequestId INT,
    @StartDate DATE,
    @EndDate DATE = NULL,
    @Frequency INT,
    @Status VARCHAR(20) = 'Active'
AS
BEGIN
    INSERT INTO Schedule (request_id, start_date, end_date, frequency, status, created_at)
    VALUES (@RequestId, @StartDate, @EndDate, @Frequency, @Status, GETDATE());

    SELECT SCOPE_IDENTITY() AS ScheduleId;
END;
GO

CREATE PROC usp_GetSchedulesByRequest
    @RequestId INT
AS
BEGIN
    SELECT 
        Id,
        request_id,
        start_date,
        end_date,
        frequency,
        status,
        created_at
    FROM Schedule
    WHERE request_id = @RequestId
    ORDER BY start_date DESC;
END;
GO

CREATE PROC usp_UpdateSchedule
    @ScheduleId INT,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL,
    @Status VARCHAR(20) = NULL
AS
BEGIN
    UPDATE Schedule
    SET
        start_date = ISNULL(@StartDate, start_date),
        end_date = ISNULL(@EndDate, end_date),
        status = ISNULL(@Status, status)
    WHERE Id = @ScheduleId;
END;
GO

CREATE PROC usp_CreatePickup
    @ScheduleId INT,
    @PickupDate DATE
AS
BEGIN
    INSERT INTO Pickup (schedule_id, pickup_date, status, created_at, updated_at)
    VALUES (@ScheduleId, @PickupDate, 'Scheduled', GETDATE(), GETDATE());

    SELECT SCOPE_IDENTITY() AS PickupId;
END;
GO

CREATE PROC usp_GetPickupsBySchedule
    @ScheduleId INT
AS
BEGIN
    SELECT 
        Id,
        schedule_id,
        pickup_date,
        status,
        created_at,
        updated_at
    FROM Pickup
    WHERE schedule_id = @ScheduleId
    ORDER BY pickup_date DESC;
END;
GO

CREATE PROC usp_UpdatePickupStatus
    @PickupId INT,
    @Status VARCHAR(20)
AS
BEGIN
    UPDATE Pickup
    SET 
        status = @Status,
        updated_at = GETDATE()
    WHERE Id = @PickupId;
END;
GO

CREATE PROC usp_CreatePickupItem
    @PickupId INT,
    @ProductId INT,
    @Quantity INT
AS
BEGIN
    INSERT INTO PickupItems (pickup_id, product_id, quantity, created_at)
    VALUES (@PickupId, @ProductId, @Quantity, GETDATE());

    SELECT SCOPE_IDENTITY() AS PickupItemId;
END;
GO

CREATE PROC usp_GetPickupItems
    @PickupId INT
AS
BEGIN
    SELECT 
        Id,
        pickup_id,
        product_id,
        quantity,
        created_at
    FROM PickupItems
    WHERE pickup_id = @PickupId;
END;
GO


