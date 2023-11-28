import { useState, useEffect} from 'react';
import { ContactData } from './eyes.interface';

function EyesContact({ contactData }: { contactData: ContactData}) {
    const [CONTACT, setContact] = useState<string>()

    useEffect(() => {
        setContact(contactData.value)
    }, [contactData])

    return (
        <div className="text-center btn-group">
            <div className="text-light d-flex justify-content-center align-items-center">
                <span className="fs-custom-0_8 ms-1">{contactData.type}: </span>
                <span className="fs-custom-0_7 ms-1">{CONTACT}</span>
            </div>
        </div>
    )
}

export default EyesContact