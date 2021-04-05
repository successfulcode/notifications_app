import { useState, useEffect} from 'react';
import { Icon, Popover, Whisper, Button, Alert} from 'rsuite';
import { v4 as uuidv4 } from 'uuid';
import AddNotification from './AddNotification';
import FilterItems from './FilterItems';
import NotificationItem from './NotificationItem';
import PaginationItems from './PaginationItems';

const NotificationsWindow = () => {

    const initialState = JSON.parse(localStorage.getItem("notifications")) || [];

    const [openWidget, setOpenWidget] = useState(true);
    const [title, setTtitle] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [linkItem, setLinkItem] = useState('');
    const [notifications, setNotifications] = useState(initialState);
    const [modeType, setModeType] = useState('info');
    const [filterItems, setFilterItems] = useState('all');
    const [searchItems, setSearchItems] = useState('');

useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
}, [notifications])

//Add new notification
    const addNotificationHandler = () => {
        
        const today = new Date()

        let newNotification = {
            id: uuidv4(),
            date: today.toLocaleDateString('lt-LT'),
            type: modeType,
            link: linkItem,
            done: false,
            notificationName: title,
            notificationDescription: descriptionText
        }

        if(title.trim().length > 0 && descriptionText.trim().length > 0 ) {
            setNotifications([newNotification,...notifications]);
            setTtitle('');
            setDescriptionText('');
            setLinkItem('');
        } else {Alert.error('Name and description is required!')}
    };

//Toggle read notification
    const toggleDone = (id) => {
        const newNotifications = notifications.map((ntf)=>{if(ntf.id === id) {
                return {...ntf, done: !ntf.done}
            }
            return ntf
        })
        setNotifications([...newNotifications])
    };

//Filter and Search items
    const searchNtf = (notifications, searchItems) => {
        if (searchItems.length === 0) {
            return notifications;
        }
        return notifications.filter((item) => {
            return item.notificationName.toLowerCase().indexOf(searchItems.toLowerCase()) > -1;
        });
    };


    const filterByImportance = (notifications, filterItems) => {
        if (filterItems === 'all') {
           return notifications
        } else if (filterItems === 'done') {
            return notifications.filter(ntf => ntf.done === true)
        } else {
            return notifications.filter(ntf => ntf.done !== true && ntf.type === filterItems)
        }
    };

//Delete item
    const deleteItemHandler = (id) => {
        setNotifications(notifications.filter(ntf => ntf.id !== id))
    }

//Show filtred items
    const visibleItems = searchNtf((filterByImportance(notifications, filterItems)),searchItems)

//Pagination
const [currentPage, setCurrentPage] = useState(1)
const [notificationsPerPage] = useState(4)
const indexOfLastPost = currentPage * notificationsPerPage
const indexOfFirstPost = indexOfLastPost - notificationsPerPage
const visibleItemsBeforePagination = visibleItems.slice(indexOfFirstPost, indexOfLastPost)

//Widget window
    const speaker = (<Popover title='Notifications widget' visible style={{ width: 500, height: 800 }}>
                        <AddNotification 
                            title={title} 
                            setTtitle={setTtitle} 
                            descriptionText={descriptionText} 
                            setDescriptionText={setDescriptionText} 
                            linkItem={linkItem} setLinkItem={setLinkItem} 
                            modeType={modeType} setModeType={setModeType} 
                            addNotificationHandler={addNotificationHandler} 
                        />
                        <FilterItems filterByImportance={setFilterItems} setSearchItems={setSearchItems} />
                        <div>
                            {visibleItems.length === 0 ? 
                                <h3 style={{textAlign:'center'}}>There is nothing...</h3> 
                                : 
                                visibleItemsBeforePagination.map((ntf)=>
                                    <NotificationItem 
                                        key={ntf.id} 
                                        type={ntf.type} 
                                        title={ntf.notificationName}
                                        notificationDescription={ntf.notificationDescription}
                                        link={ntf.link}
                                        done={ntf.done}
                                        toggleDone={toggleDone}
                                        deleteItem={deleteItemHandler}
                                        id={ntf.id}
                                    />
                            )}
                        </div>
                        <PaginationItems 
                            setCurrentPage={setCurrentPage} 
                            notificationsPerPage={notificationsPerPage} 
                            visibleNotificationsLength={visibleItems.length} 
                            currentPage={currentPage} 
                        />
                    </Popover>)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5em'}}>
            <Whisper
                preventOverflow
                trigger='click'
                container={''}
                speaker={speaker}
                placement='bottom'
            >
                <Button color={openWidget? 'green' : 'orange'} onClick={()=>setOpenWidget(!openWidget)} style={{ width: '14em', height: '5em' }}>
                    <Icon icon={openWidget? 'camera-retro' : 'ban'} size='2x' /> 
                    {openWidget? <h5>Open widget</h5> : <h5>Close widget</h5>}
                </Button>
            </Whisper>
        </div>
    )
};

export default NotificationsWindow;
