

export default function Modal( { visible, toggleModalVisible, children } ) {

    if (!visible) return null;

    return(
        <div className="overlay">
            <div className="modal-container">
                <button onClick={toggleModalVisible}>Exit</button>
                {children}
            </div>
        </div>
    );
}