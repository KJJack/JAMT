import { useState, useContext } from 'react';
import { UserContext } from '../util/UserContext';
import { deleteUserApplication, getUserApplications, updateUserApplication } from '../api/api';
import { formatDateForAPI } from '../util/UtilFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Prompt from './Prompt';
import Modal from './Modal';
import ApplicationInformation from './ApplicationInformation';
import EditApp from './EditApp';
import PromptModal from './PromptModal';
import DeleteApp from './DeleteApp';
import ContactApp from './ContactApp';


export default function AppDetails({ application }) {

    const [details, setDetails] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [promptVisible, setPromptVisible] = useState(false);
    const [promptModalVisible, setPromptModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isContact, setIsContact] = useState(false);
    const [contactedInterviewDate, setContactedInterviewDate] = useState('');
    const [contactedInterviewTime, setContactedInterviewTime] = useState('');
    const { user, setApplications } = useContext(UserContext);
    
    
    const handleViewClick = () => {
        //setIsEditMode(false);
        setModalVisible(true);
    }
    
    const handleEdit = () => {
        setIsEditMode(true);
        setModalVisible(true);
    }

    const toggleModalVisible = () => {
        setModalVisible(prevState => !prevState);
        setIsEditMode(false);
    }

    const togglePromptModalVisible = () => {
        setPromptModalVisible(prevState => !prevState);
    }

    const handleDeleteClick = () => {
        setIsDelete(true);
        setIsContact(false);
        setPromptModalVisible(true);
    }

    const handleContactClick = () => {
        setIsContact(true);
        setIsDelete(false);
        setPromptModalVisible(true);
    }

    const promptOnConfirm = async () => {
        if (isDelete) {
            console.log('Confirmed Delete');
            try {
                const userId = user.id || user._id;
                const applicationId = application.id || application._id;

                const response = await deleteUserApplication(userId, applicationId);
                const updatedApplications = await getUserApplications(userId);
                setApplications(updatedApplications);
                console.log(response);
                togglePromptModalVisible(false);
                setIsDelete(false);
            } catch (error) {
                console.log(`Error deleting application `, error);
                togglePromptModalVisible(false);
            }
        }
        else if (isContact) {
            try {
                const userId = user.id || user._id;
                const applicationId = application.id || application._id;
                const formattedDate = formatDateForAPI(contactedInterviewDate, contactedInterviewTime);

                const updatedApplication = {...application, contacted: true, interviewDate: formattedDate};
                const response = await updateUserApplication(userId, applicationId, updatedApplication);
                const updatedApplications = await getUserApplications(userId);
                setApplications(updatedApplications);
                console.log(response);
                togglePromptModalVisible(false);
                setIsContact(false);
            } catch(error) {
                console.log('Error updating contact and interview date', error);
                togglePromptModalVisible(false);
                setIsContact(false);
            }
        }
    }

    const promptOnCancel = () => {
        togglePromptModalVisible(false);
    } 
    
    return(
        <div className='application-details-container'>
            <span>Company: <a href={application.companyUrl} target='_'>{application.company}</a></span>
            <span>Position: {application.position}</span>
            <span>Location: {application.location}</span>
            <span>Applied Date: {application.addedAt}</span>
            <span>Contacted: {application.contacted ? 'Yes' : 'No'}</span>
            <span>Contacted Date: {application.contactedAt}</span>
            <span>Reqs: {application.prereqs.join(', ')} </span>

            <div className='app-detail-btn-container'>
                <div className='app-detail-btn' id='app-detail-btn-view' onClick={handleViewClick}>
                    <FontAwesomeIcon className='app-detail-btn-icon' id='eye' icon={faEye} />
                </div>
                <div className='app-detail-btn' id='app-detail-btn-edit'>
                    <FontAwesomeIcon className='app-detail-btn-icon' id='pen' icon={faPenToSquare} onClick={handleEdit} />
                </div>
                <div className='app-detail-btn' id='app-detail-btn-check'>
                    <FontAwesomeIcon className='app-detail-btn-icon' id='check' icon={faCheck} onClick={handleContactClick}/>
                </div>
                <div className='app-detail-btn' id='app-detail-btn-delete' onClick={handleDeleteClick}>
                    <FontAwesomeIcon className='app-detail-btn-icon' id='trash' icon={faTrash} />
                </div>
            </div>


            <PromptModal isPromptVisible={promptModalVisible} promptModalToggle={togglePromptModalVisible} onConfirm={promptOnConfirm} onCancel={promptOnCancel}>
                {
                    isDelete ? (
                        <DeleteApp application={application}/>
                    ) : (
                        <ContactApp application={application} 
                            contactedInterviewDate={contactedInterviewDate} 
                            setContactedInterviewDate={setContactedInterviewDate}
                            contactedInterviewTime={contactedInterviewTime}
                            setContactedInterviewTime={setContactedInterviewTime}
                        />
                    )
                }
            </PromptModal>

            <Modal visible={modalVisible} toggleModalVisible={toggleModalVisible}>
                {
                    isEditMode ? (
                        <EditApp application={application}/>
                    ) : (
                        <ApplicationInformation application={application} />
                    )
                }
            </Modal>

        </div>
    );
}