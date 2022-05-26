import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

const Documents = (props) => {

    const agreement = props.agreement
    const docList = []
    // const documents = agreement.details.documents
    for (let key in agreement.details.documents) {
        docList.unshift(
            {
                ...agreement.details.documents[key]
            }
        )
    }
    console.log(docList)

    return (
        <div>
            <div>
                <div className='d-flex justify-content-left'>
                    <div >
                        <Image className='agreements-profile-pic my-2' src={agreement.agency.imageRef} />
                    </div>
                    <div className='ms-3 mt-2'>
                        <h5 className='d-flex'>{agreement.agency.companyName}</h5>
                        <div className='d-flex text-decoration-none text-secondary'>Jorobs-Quotation.pdf</div>
                    </div>
                </div>
                <hr />
            </div>
            {docList.map((document) =>
                <div>
                    <div className='text-capitalize'>{document.type}</div>
                    <div className='text-capitalize'>{document.fileName}</div>
                    <DocViewer pluginRenderers={DocViewerRenderers} documents={[{ uri: document.contentRef, fileType:'docx' }]} />
                </div>
            )}
        </div>
    )
}

export default Documents
