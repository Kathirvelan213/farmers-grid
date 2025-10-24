import { useEffect, useMemo, useState } from 'react';
import './styles/RequestsPage.css';
import { getMyRequestsAPI, getRequestDetailsAPI, updateRequestStatusAPI } from '../apiConsumer/requestsAPI.js';
import { useAuth } from '../global/components/AuthProvider.jsx';
import RequestsSignalrService from './RequestsSignalrService.js';

function RequestsList({ title, items, showReceiverOnly }){
    return (
        <div className='requestsPanel'>
            <div className='panelTitle'>{title}</div>
            <div className='requestsList'>
                {items.map(x => (
                    <RequestRow key={x.requestId} request={x} isIncoming={title === 'Incoming Requests'} />
                ))}
                {items.length===0 && <div className='emptyState'>No requests</div>}
            </div>
        </div>
    );
}

function RequestRow({ request, isIncoming }){
    const [expanded,setExpanded]=useState(false);
    const [items,setItems]=useState([]);
    const [loading,setLoading]=useState(false);
    const [actionLoading,setActionLoading]=useState(false);

    const handleToggle=async()=>{
        if(!expanded){
            setLoading(true);
            try{
                const res = await getRequestDetailsAPI(request.requestId);
                setItems(res.data.items ?? []);
            } finally {
                setLoading(false);
            }
        }
        setExpanded(prev=>!prev);
    };

    const handleStatusUpdate=async(status)=>{
        if(actionLoading) return;
        setActionLoading(true);
        try{
            await updateRequestStatusAPI({requestId: request.requestId, status});
            // The SignalR event will trigger a refresh
        } catch(error){
            console.error('Failed to update status:', error);
            alert('Failed to update request status');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className='requestBlock'>
            <div className='requestRow' onClick={handleToggle}>
                <div className='rowMain'>
                    <span className='reqId'>#{request.requestId}</span>

                        <span className='reqParties'>{request.receiverName}</span>
                </div>
                <div className='rowMeta'>
                    <span className={`status status-${request.status}`}>{request.status}</span>
                    <span className='createdAt'>{new Date(request.createdAt).toLocaleString()}</span>
                </div>
            </div>
            {expanded && (
                <div className='requestItems'>
                    {loading && <div className='loadingRow'>loading items...</div>}
                    {!loading && items.map(it => (
                        <div key={it.itemId} className='itemRow'>
                            <span className='prodName'>{it.productName}</span>
                            <span className='price'>₹{it.offeredPrice}</span>
                        </div>
                    ))}
                    {!loading && items.length===0 && <div className='emptyState'>No items</div>}
                    
                    {isIncoming && request.status === 'pending' && (
                        <div className='actionButtons'>
                            <button 
                                className='acceptBtn' 
                                onClick={(e)=>{e.stopPropagation(); handleStatusUpdate('accepted');}}
                                disabled={actionLoading}
                            >
                                {actionLoading ? 'Processing...' : 'Accept'}
                            </button>
                            <button 
                                className='rejectBtn' 
                                onClick={(e)=>{e.stopPropagation(); handleStatusUpdate('rejected');}}
                                disabled={actionLoading}
                            >
                                {actionLoading ? 'Processing...' : 'Reject'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function RequestsPage(){
    const { user } = useAuth();
    const [requests,setRequests]=useState([]);
    const [loading,setLoading]=useState(true);
    const [activeTab,setActiveTab]=useState('my');

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await getMyRequestsAPI();
                setRequests(res.data ?? []);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        (async()=>{
            try{
                await RequestsSignalrService.start();
                RequestsSignalrService.on('RequestCreated', fetchData);
                RequestsSignalrService.on('RequestUpdated', fetchData);
            } catch {}
        })();
        return ()=>{
            RequestsSignalrService.off('RequestCreated');
            RequestsSignalrService.off('RequestUpdated');
        };
    },[]);

    const myRequests = useMemo(()=>requests.filter(r => r.senderId===user?.Id || r.senderId===user?.id),[requests,user]);
    const incomingRequests = useMemo(()=>requests.filter(r => r.receiverId===user?.Id || r.receiverId===user?.id),[requests,user]);

    if(loading){
        return <div>loading</div>
    }


    return (
        <div className='requestsPage'>
            <div className='tabs'>
                <button className={`tab ${activeTab==='my'?'active':''}`} onClick={()=>setActiveTab('my')}>My Requests</button>
                <button className={`tab ${activeTab==='incoming'?'active':''}`} onClick={()=>setActiveTab('incoming')}>Incoming Requests</button>
            </div>
            {activeTab==='my' && <RequestsList title='My Requests' items={myRequests}  />}
            {activeTab==='incoming' && <RequestsList title='Incoming Requests' items={incomingRequests} />}
        </div>
    );
}


