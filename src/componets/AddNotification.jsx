import { Icon, Button, Input, Radio, RadioGroup } from 'rsuite';

const AddNotification = ({ title, setTtitle, descriptionText, setDescriptionText, linkItem, setLinkItem, modeType, setModeType, addNotificationHandler}) => {
    return (
        <div style={{backgroundColor: '#F5F5F5', padding: '.5em .5em .0em .5em', marginBottom: '.5em', borderRadius: '10px'}}>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <div style={{ width: '35em'}}>
                    <Input placeholder={'Title'} size='sm' style={{marginBottom: '.5em'}} value={title} onChange={(value, checked, event) => {setTtitle(value, checked, event)}} />
                    <Input placeholder={'Description'} size='sm' style={{marginBottom: '.5em'}} value={descriptionText} onChange={(value, checked, event) => {setDescriptionText(value, checked, event)}} />
                    <Input placeholder={'Link to website'} size='sm' style={{marginBottom: '.5em'}} value={linkItem} onChange={(value, checked, event) => {setLinkItem(value, checked, event)}} />
                </div>
                     
                <div style={{display:'flex', alignItems: 'center'}}>
                    <Button color='green' style={{display:'flex', alignItems: 'center', padding:'.6em', height: '6.5rem', marginLeft: '.2em'}} onClick={()=>addNotificationHandler()}>
                        <Icon icon='send' size='2x' /> 
                    </Button>
                </div>
            </div>
                    
            <div style={{ height: '2rem'}} >
                <RadioGroup inline value={modeType} onChange={value => setModeType(value)}>
                    <Radio value='info'>Info</Radio>
                    <Radio value='success'>Success</Radio>
                    <Radio value='warning'>Danger</Radio>
                    <Radio value='error'>Error</Radio>
                </RadioGroup>
            </div>
        </div>
    )
}


export default AddNotification;
