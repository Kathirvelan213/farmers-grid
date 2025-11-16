import { useEffect, useState } from 'react';
import './styles/TransportationPage.css';
import { 
    getSchedulesAPI, 
    createScheduleAPI, 
    updateScheduleAPI,
    getPickupsAPI,
    createPickupAPI,
    getPickupItemsAPI,
    createPickupItemAPI,
    updatePickupStatusAPI
} from '../apiConsumer/transportationAPI.js';
import { useAuth } from '../global/components/AuthProvider.jsx';

// Calendar View remains as-is, no API changes required
function CalendarView({ events, onDateClick }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
        for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));
        return days;
    };
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };
    
    const getEventsForDate = (date) => {
        if (!date) return [];
        return events.filter(event => {
            const eventDate = new Date(event.pickupDate || event.scheduledDate);
            return eventDate.toDateString() === date.toDateString();
        });
    };
    
    const days = getDaysInMonth(currentDate);
    
    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={() => navigateMonth(-1)}>←</button>
                <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <button onClick={() => navigateMonth(1)}>→</button>
            </div>
            <div className="calendar-grid">
                {dayNames.map(day => (
                    <div key={day} className="day-header">{day}</div>
                ))}
                {days.map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    return (
                        <div 
                            key={index} 
                            className={`calendar-day ${day ? 'has-date' : 'empty'}`}
                            onClick={() => day && onDateClick(day)}
                        >
                            {day && (
                                <>
                                    <span className="day-number">{day.getDate()}</span>
                                    {dayEvents.length > 0 && (
                                        <div className="event-indicator">
                                            {dayEvents.length} pickup{dayEvents.length > 1 ? 's' : ''}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Schedule Card updated for new schema
function ScheduleCard({ schedule, onManagePickup }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [pickups, setPickups] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadPickups = async () => {
        if (isExpanded) return;
        setLoading(true);
        try {
            const res = await getPickupsAPI(schedule.id);
            setPickups(res.data || []);
        } finally {
            setLoading(false);
        }
        setIsExpanded(true);
    };

    return (
        <div className="schedule-card">
            <div className="schedule-header" onClick={loadPickups}>
                <div className="schedule-info">
                    <h4>Schedule #{schedule.id}</h4>
                    <p>Start Date: {new Date(schedule.startDate).toLocaleDateString()}</p>
                    {schedule.endDate && <p>End Date: {new Date(schedule.endDate).toLocaleDateString()}</p>}
                    <p>Frequency: {schedule.frequency}</p>
                    <p>Status: {schedule.status}</p>
                </div>
            </div>

            {isExpanded && (
                <div className="schedule-details">
                    {loading && <div>Loading pickups...</div>}
                    {!loading && (
                        <>
                            <div className="pickup-list">
                                <h5>Pickups</h5>
                                {pickups.map(pickup => (
                                    <div key={pickup.id} className="pickup-item">
                                        <span>{new Date(pickup.pickupDate).toLocaleDateString()}</span>
                                        <span className={`status ${pickup.status}`}>{pickup.status}</span>
                                        <button onClick={() => onManagePickup(pickup)}>Manage</button>
                                    </div>
                                ))}
                            </div>

                            <div className="schedule-actions">
                                <button onClick={async () => {
                                    const newDate = prompt('Enter pickup date (YYYY-MM-DD):');
                                    if (newDate) {
                                        await createPickupAPI({
                                            scheduleId: schedule.id,
                                            pickupDate: newDate
                                        });
                                        window.location.reload();
                                    }
                                }}>
                                    Add Pickup
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// Pickup management updated for new API
function PickupManagement({ pickup, onClose }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const loadItems = async () => {
            try {
                const res = await getPickupItemsAPI(pickup.id);
                setItems(res.data || []);
                const initialQuantities = {};
                res.data?.forEach(item => {
                    initialQuantities[item.productId] = item.quantity || 0;
                });
                setQuantities(initialQuantities);
            } finally {
                setLoading(false);
            }
        };
        loadItems();
    }, [pickup.id]);

    const handleQuantityChange = (productId, value) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: parseInt(value) || 0
        }));
    };

    const handleSaveQuantities = async () => {
        try {
            for (const [productId, quantity] of Object.entries(quantities)) {
                await createPickupItemAPI({
                    pickupId: pickup.id,
                    productId: parseInt(productId),
                    quantity
                });
            }
            alert('Quantities saved successfully!');
            onClose();
        } catch (error) {
            console.error('Failed to save quantities:', error);
            alert('Failed to save quantities');
        }
    };

    const handleCompletePickup = async () => {
        try {
            await updatePickupStatusAPI({
                pickupId: pickup.id,
                status: 'Completed'
            });
            alert('Pickup marked as completed!');
            onClose();
        } catch (error) {
            console.error('Failed to complete pickup:', error);
        }
    };

    if (loading) return <div className="pickup-management">Loading...</div>;

    return (
        <div className="pickup-management">
            <div className="pickup-header">
                <h3>Pickup Management - {new Date(pickup.pickupDate).toLocaleDateString()}</h3>
                <button onClick={onClose}>×</button>
            </div>

            <div className="quantity-inputs">
                <h4>Enter quantities for each product:</h4>
                {items.map(item => (
                    <div key={item.productId} className="quantity-input">
                        <label>Product #{item.productId}</label>
                        <input
                            type="number"
                            min="0"
                            value={quantities[item.productId] || 0}
                            onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="pickup-actions">
                <button onClick={handleSaveQuantities}>Save Quantities</button>
                <button onClick={handleCompletePickup} className="complete-btn">
                    Mark as Completed
                </button>
            </div>
        </div>
    );
}

// Main Transportation Page
export function TransportationPage() {
    const { user } = useAuth();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [activeTab, setActiveTab] = useState('schedules');

    useEffect(() => {
        const loadData = async () => {
            try {
                // Replace '0' with actual requestId if needed
                const schedulesRes = await getSchedulesAPI(1);
                setSchedules(schedulesRes.data || []);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleDateClick = (date) => {
        console.log('Date clicked:', date);
    };

    const handleCreateSchedule = async () => {
        const startDate = prompt('Enter start date (YYYY-MM-DD):');
        const endDate = prompt('Enter end date (YYYY-MM-DD) or leave blank:');
        const frequency = prompt('Enter pickup frequency in days (0 = one-time):', '7');

        if (startDate) {
            try {
                const response = await createScheduleAPI({
                    requestId: 1, // Replace with real requestId
                    startDate,
                    endDate: endDate || null,
                    frequency,
                    status: 'Active'
                });
                setSchedules(prev => [...prev, response.data]);
                alert('Schedule created successfully!');
            } catch (error) {
                console.error('Failed to create schedule:', error);
            }
        }
    };

    if (loading) return <div>Loading transportation data...</div>;

    return (
        <div className="transportation-page">
            <div className="page-header">
                <h2>Transportation Management</h2>
                <div className="tabs">
                    <button 
                        className={`tab ${activeTab === 'schedules' ? 'active' : ''}`}
                        onClick={() => setActiveTab('schedules')}
                    >
                        Schedules
                    </button>
                    <button 
                        className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('calendar')}
                    >
                        Calendar
                    </button>
                </div>
                <button onClick={handleCreateSchedule}>+ Create Schedule</button>
            </div>

            {activeTab === 'schedules' && (
                <div className="schedules-section">
                    {schedules.length === 0 ? (
                        <div className="empty-state">No transportation schedules found</div>
                    ) : (
                        <div className="schedules-grid">
                            {schedules.map(schedule => (
                                <ScheduleCard 
                                    key={schedule.id} 
                                    schedule={schedule} 
                                    onManagePickup={setSelectedPickup} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'calendar' && (
                <div className="calendar-section">
                    <h3>Pickup Calendar</h3>
                    <CalendarView 
                        events={[]} // No calendar API, leave empty
                        onDateClick={handleDateClick}
                    />
                </div>
            )}

            {selectedPickup && (
                <PickupManagement 
                    pickup={selectedPickup} 
                    onClose={() => setSelectedPickup(null)} 
                />
            )}
        </div>
    );
}
