import { useState, useContext } from 'react';
import { UserContext } from '../util/UserContext';
import { deleteUserApplication, getUserApplications } from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Prompt from './Prompt';
import Modal from './Modal';
import ApplicationInformation from './ApplicationInformation';
import EditApp from './EditApp';


export default function AppDetails({ application }) {

    const [details, setDetails] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [promptVisible, setPromptVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { user, setApplications } = useContext(UserContext);

    const handleDelete = () => {
        setPromptVisible(true);
    }

    const handleConfirmCancel = () => {
        console.log('Deletion cancelled');
        setPromptVisible(false);
    }

    
    const handleConfirmDelete = async () => {
        console.log('Deleting: ', application);
        
        try {
            const userId = user.id || user._id;
            const applicationId = application.id || application._id;
            
            const response = await deleteUserApplication(userId, applicationId);
            const updatedApplications = await getUserApplications(userId);
            setApplications(updatedApplications);
            setPromptVisible(false);
            console.log(response);
            //window.location.reload();
            
        } catch(error) {
            console.log("Error deleting application: ", error);
        }
    }
    
    
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
    
    return(
        <div className='application-details-container'>
            <span>Company: <a href={application.companyUrl} target='_'>{application.company}</a></span>
            <span>Position: {application.position}</span>
            <span>Location: {application.location}</span>
            <span>Applied Date: {application.addedAt}</span>
            <span>Contacted: {application.contacted ? 'Yes' : 'No'}</span>
            <span>Contacted Date: {application.contactedAt}</span>
            <span>Reqs: {application.prereqs}</span>

            <div className='app-detail-btn-container'>
                <div className='app-detail-btn' id='app-detail-btn-view' onClick={handleViewClick}>
                    <FontAwesomeIcon className='app-detail-btn-icon' id='eye' icon={faEye} />
                </div>
                <div className='app-detail-btn' id='app-detail-btn-edit'>
                    <FontAwesomeIcon className='app-detail-btn-icon' id='pen' icon={faPenToSquare} onClick={handleEdit} />
                </div>
                <div className='app-detail-btn' id='app-detail-btn-check'>
                    <FontAwesomeIcon className='app-detail-btn-icon' id='check' icon={faCheck} />
                </div>
                <div className='app-detail-btn' id='app-detail-btn-delete' onClick={handleDelete}>
                    <FontAwesomeIcon className='app-detail-btn-icon' id='trash' icon={faTrash} />
                </div>
            </div>

            {promptVisible && (
                    <Prompt
                        message="Are you sure you want to delete?"
                        onConfirm={handleConfirmDelete}
                        onCancel={handleConfirmCancel}
                    />
                )
            }


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