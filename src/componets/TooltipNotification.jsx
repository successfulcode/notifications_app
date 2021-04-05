import { Whisper, Tooltip, Button, Icon } from 'rsuite';

const TooltipNotification = ({ notificationDescription, title }) => {
    return (
        <Whisper
            trigger="click"
            placement="auto"
            speaker={
                <Tooltip>
                  <div>
                      <h6>
                          {title}
                      </h6>
                  </div>
                  <div>
                      <p>
                          {notificationDescription}
                      </p>
                  </div>
                </Tooltip>
            }
        >
            <Button  color='blue'>
                <Icon icon='more' size='2x' /> 
            </Button>
        </Whisper>
    )
}

export default TooltipNotification
