
export default function Prompt( { message, onCancel, onConfirm} ) {
    return(
        <div className="prompt-overlay" onClick={e => e.stopPropagation}>
            <div className="prompt-container">
                <p>{message}</p>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    );
}