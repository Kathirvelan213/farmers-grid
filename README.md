# Farmers-Grid
The project 'farmers-grid' aims to solve the middleman problem faced by farmers leading to a lower income for them. This project eliminates the middleman with the use of a Mobile &amp; web application to connect farmers directly to the consumers/retailers 

**SNEAK-PEAK**
<div align="center">
  
<img src="ProjectOutput/Login.png" width="720" > 
<br/>
<img src="ProjectOutput/Chat.png" width="720"> 
<br/>
<img src="ProjectOutput/AddProduct.png" width="720"> 
</div>


## 🏗️ System Architecture

<table>
<tr>
<td width="300" valign="top">

### Tech Stack

<table>
<tr>
<td align="center">
<b> WebPortal</b><br/>
<sub>Frontend Layer</sub><br/><br/>
<code>HTML/CSS/React.js</code><br/>
Auth • Dashboard • SasManager
  <br/>
API Consumer • SignalRService
</td>
</tr>
<tr><td align="center">↓ HTTPS REST API</td></tr>
<tr>
<td align="center">
<b> FarmersGrid.API</b><br/>
<sub>Backend API Layer</sub><br/><br/>
<code>ASP.NET Core Web API</code><br/>
<code>HTTP Cookie +JWT Auth</code><br/>
Controllers → Services → DTOs
  <br/>
Hubs (Azure SignalR Websockets)->Services
</td>
</tr>
<tr><td align="center">↓</td></tr>
<tr>
<td align="center">
<b> FarmersGrid.BAL</b><br/>
<sub>Business Layer</sub><br/><br/>
<code>C# Class Library</code><br/>
AuthBusiness • UserBusiness<br/>
ProductBusiness • MatchScoreManager<br/>
ChatManager • TransportBusiness
</td>
</tr>
<tr><td align="center">↓</td></tr>
<tr>
<td align="center">
<b> FarmersGrid.DAL</b><br/>
<sub>Data Layer</sub><br/><br/>
<code>DbContext</code><br/>
UserRepo • Products • Schedules<br/>
  ChatData • RequestsData
</td>
</tr>
<tr><td align="center">↓</td></tr>
<tr>
<td align="center">
<b> Cloud Database</b><br/>
<sub>Azure SQL • Azure Blob Storage</sub>
</td>
</tr>
</table>

</td>
<td width="1000" valign="center" align="center">

### Visual Flow
```mermaid
flowchart TD
    A[🌐 **WebPortal**<br/>Frontend Layer<br/>HTML/CSS/REACT.JS]
    B[🔌 **FarmersGrid.API**<br/>Backend API Layer<br/>ASP.NET Core]
    C[💼 **FarmersGrid.BAL**<br/>Business Layer]
    D[💾 **FarmersGrid.DAL**<br/>Data Layer]
    E[🗄️ **Cloud Database**<br/>Azure SQL]
    G[📁 **Azure Blob Storage**<br/>Images, Documents, Media]
    H[🔔 **Azure SignalR**<br/>Real-time WebSockets Updates]

    %% Primary Flow
    A -->|HTTPS REST| B
    B --> C
    C --> D
    D --> E


    %% Additional Cloud Integrations
    A -->|Real-time UI Updates| H
    B -->|Push Events| H
    B -->|Upload / Download| G


    %% Styles 
    style A fill:#E8F1FA,stroke:#1E70C1,stroke-width:2px,color:#0B2E4E
    style B fill:#E0F7F4,stroke:#00897B,stroke-width:2px,color:#004D40
    style C fill:#E0F7F4,stroke:#00897B,stroke-width:2px,color:#004D40
    style D fill:#E0F7F4,stroke:#00897B,stroke-width:2px,color:#004D40
    style E fill:#FFF5D6,stroke:#D4A017,stroke-width:2px,color:#6A5200
    style G fill:#F1E7FF,stroke:#7E57C2,stroke-width:2px,color:#3E2A7C
    style H fill:#FCE4EC,stroke:#C2185B,stroke-width:2px,color:#880E4F

```

</td>
</tr>
</table>



## System Modules
| Module | Description |
|---------------|--------------------------------------------|
| | |
| Farmer Module | |
| Handles all farmer-facing features related to product management and negotiation.<br><br>- Create and manage product listings<br>- Set and update pricing<br>- Receive buyer proposals<br>- Accept or decline offers<br>- Chat with buyers<br>- Choose transport or logistics options |<img src="ProjectOutput/MyProducts.png" width="720">  |
| Buyer Module |  |
| Provides buyers with tools to find products, negotiate, and contact farmers.<br><br>- Create product requests<br>- Set desired prices<br>- Receive matched farmers<br>- Send purchase proposals<br>- Chat with farmers<br>- Select delivery or pickup options |<img src="ProjectOutput/Requests.png" width="720"> |
| Matchmaker Module |  |
| Computes compatibility between farmers and buyers using data-driven scoring.<br><br>- Compare price expectations<br>- Calculate distance<br>- Match demand and available quantity<br>- Generate a match score<br>- Rank best potential matches |<img src="ProjectOutput/Profile.png" width="720"> |
| Messaging Module | |
| Allows direct communication between users.<br><br>- In-app real-time chat<br>- Option to reveal phone number<br>- Basic message history |<img src="ProjectOutput/Chat.png" width="720">  |
| Logistics Module |  |
| Coordinates the transportation of goods efficiently.<br><br>- Pooled transport routing<br>- Optimized multi-drop delivery<br>- Cost-efficient shared routes<br>- Support for self-arranged transport |<img src="ProjectOutput/Schedule.png" width="720"> |

