import { Message, Button, Icon } from 'rsuite';
import TooltipNotification from './TooltipNotification';

const NotificationItem = ({ type, title, notificationDescription, link, done, toggleDone, id, deleteItem }) => {

    return (
        <Message 
            style={{padding:'0px', textDecoration: done ?'line-through':'none', backgroundColor: done && '#F5F5F5' }}
            type={type}
            title={title} 
            description={
                <div style={{padding:'0px', display:'flex', justifyContent: 'space-between'}}>
                   <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                       <p style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{notificationDescription}</p><br />
                       <a href={link} target='_blank' rel='noreferrer'>
                            {link}
                        </a>
                   </div>
                   <div style={{display:'flex', alignItems: 'center'}}>
                       <div style={{marginRight:'.2em'}}>
                            <TooltipNotification notificationDescription={notificationDescription} title={title} />
                       </div>
                       <Button style={{marginRight:'.2em'}} onClick={()=>toggleDone(id)}>
                            <Icon icon='check' size='2x' /> 
                       </Button>
                       <Button color='red' onClick={()=>deleteItem(id)}>
                            <Icon icon='trash' size='2x' /> 
                       </Button>
                   </div>
                </div>}   
        />
    )
};

export default NotificationItem;
