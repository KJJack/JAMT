

export default function PromptModal( { isPromptVisible, promptModalToggle, onConfirm, onCancel, children } ) {

    if (!isPromptVisible) { return null; };

    return(
        <div className="prompt-overlay">
            <div className="prompt-container">
                {children}
                <div>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>

            </div>
        </div>
    );
}