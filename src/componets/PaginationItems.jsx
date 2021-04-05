
import { Pagination } from 'rsuite';

const PaginationItems = ({ setCurrentPage, notificationsPerPage, visibleNotificationsLength, currentPage }) => {

const pageNumbers = [];
for(let i=1; i <= Math.ceil(visibleNotificationsLength / notificationsPerPage); i++) {
    pageNumbers.push(i)
}
const handleSelect = (eventKey) => {setCurrentPage(eventKey)}

    return (
        <div style={{textAlign: 'center'}}>
            { visibleNotificationsLength / notificationsPerPage > 1 &&
                <Pagination
                    prev
                    last
                    next
                    first
                    size="lg"
                    pages={pageNumbers.length}
                    activePage={currentPage}
                    onSelect={handleSelect}
                    maxButtons={6}
            />
            }   
        </div>
    )
};

export default PaginationItems;
