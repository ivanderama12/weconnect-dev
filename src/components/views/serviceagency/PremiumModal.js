import PremiumContent from './PremiumContent'
import { Button, Modal } from 'react-bootstrap'

function PremiumModal(props) {
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Feature is for Premium Accounts only
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PremiumContent />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PremiumModal