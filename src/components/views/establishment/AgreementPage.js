import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Image,
    Row
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

import Menu from './Menu'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import results from '../../../results';
import { useAuth } from '../../../AuthContext';
import Documents from './Documents';


const AgreementPage = () => {

    let history = useHistory()
    const { currentUser } = useAuth()
    const [agreementList, setAgreementList] = useState([])
    const [loading, setLoading] = useState()
    const [selectedAgreement, setSelectedAgreement] = useState()
    const [selectedAgreementID, setSelectedAgreementID] = useState()


    useEffect(() => {
        var agreementsWithDetails = []
        Promise.all([results.get('/agreements/.json'), results.get('/users/serviceagency/.json')])
            .then(function (response) {
                setLoading(true)
                const agencies = response[1].data
                const agreements = response[0].data
                for (let key in agreements) {
                    const establishmentID = agreements[key].establishment
                    const agencyID = agreements[key].agency
                    if (establishmentID === currentUser.uid) {
                        agreementsWithDetails.unshift(
                            {
                                id: key,
                                details: agreements[key],
                                agency: agencies[agencyID],
                                selected: false
                            }
                        )
                    }
                }
                if (agreementsWithDetails.length !== 0) {
                    agreementsWithDetails[0] = {
                        ...agreementsWithDetails[0],
                        selected: true
                    }
                    setSelectedAgreementID(agreementsWithDetails[0].id)
                    setSelectedAgreement(agreementsWithDetails[0])
                    setAgreementList(agreementsWithDetails)
                    setLoading(false)
                }
            })
    }, [])

    function clickHandler(agreement) {
        var agreements = agreementList

        for (let i = 0; i < agreements.length; i++) {
            if (agreements[i].id === selectedAgreementID) {
                agreements[i] = {
                    ...agreements[i],
                    selected: false
                }
            }
            if (agreements[i].id === agreement.id) {
                agreements[i] = {
                    ...agreements[i],
                    selected: true
                }
                setSelectedAgreementID(agreements[i].id)
                setSelectedAgreement(agreements[i])
            }
        }
        setAgreementList(agreements)
    }

    return (
        <div style={{ height: '100%' }} >
            <Navbar />
            <SearchBar />
            <Menu />
            <Container className='text-center'>
                <h2 className='mt-3'>Agreements</h2>
                {agreementList.length === 0 && <h4>Agreements Empty!</h4>}
                {agreementList.length !== 0 && !loading && <div className='d-flex justify-content-around mt-3' >
                    <div style={{ width: '35%' }}>
                        <Card >
                            <Card.Header className='text-start'>
                                <h4>
                                    List of Agreements
                                </h4>
                            </Card.Header>
                            <Card.Body className='m-0 p-0'>
                                <div>
                                    {agreementList.map((agreement) =>
                                        <div as={Button} onClick={(e) => clickHandler(agreement)} className={agreement.selected ? 'p-3 bg-danger' : 'p-3'}>
                                            <div className='d-flex'>
                                                <div >
                                                    <Image className='agreements-profile-pic my-2' src={agreement.agency.imageRef} />
                                                </div>
                                                <div className='ms-3 mt-2'>
                                                    <h5 style={{ maxWidth:'100vw ' }} className={'d-flex font-weight-bold text-truncate d-inline-block' + (agreement.selected ? ' text-light ' : 'text-dark')}>{agreement.agency.companyName}</h5>
                                                    <div className={agreement.selected ? 'd-flex text-decoration-none text-light' : 'd-flex text-decoration-none text-secondary'}>Jorobs-Quotation.pdf</div>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div style={{ width: '65%' }}>
                        <Card>
                            <Card.Header className='text-start'>
                                <h4>
                                    View Document(s)
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                {!loading && selectedAgreement && <Documents agreement={selectedAgreement} />}
                            </Card.Body>
                        </Card>
                    </div>
                </div>}
            </Container >
        </div >
    )
}

export default AgreementPage;
