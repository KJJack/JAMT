

export default function ContactApp({ application, contactedInterviewDate ,setContactedInterviewDate, contactedInterviewTime, setContactedInterviewTime }) {

    const handleDateChange = (e) => {
        setContactedInterviewDate(e.target.value);
    }

    const handleTimeChange = (e) => {
        setContactedInterviewTime(e.target.value);
    }

    return(
        <div>
            <h4>Congratulations on {application.company} reaching out to you!</h4>
            <p>If an interview date has not been set, no worries! You can set it later in the edit tab!</p>
            <input
                type="date"
                value={contactedInterviewDate}
                onChange={handleDateChange}
            />
            <input
                type="time"
                value={contactedInterviewTime}
                onChange={handleTimeChange}
            />
        </div>
    );
}