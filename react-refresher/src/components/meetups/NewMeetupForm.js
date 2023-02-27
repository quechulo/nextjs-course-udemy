import { useRef } from 'react';

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css"

function NewMeetupForm(props) {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const eneteredTitle = titleInputRef.current.value;
        const eneteredImage = imageInputRef.current.value;
        const eneteredAddress = addressInputRef.current.value;
        const eneteredDescription = descriptionInputRef.current.value;

        const meetupData = {
            title: eneteredTitle,
            image: eneteredImage,
            address: eneteredAddress,
            description: eneteredDescription
        }

        props.sendForm(meetupData);
    }

    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="title">Meetup Title</label>
                <input type="text" required id="title" ref={titleInputRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="image">Meetup Image</label>
                <input type="url" required id="image" ref={imageInputRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="address">Meetup Address</label>
                <input type="text" required id="address" ref={addressInputRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="description">Description</label>
                <textarea id="description" required rows='5' ref={descriptionInputRef}></textarea>
            </div>
            <div className={classes.action}>
                <button>Add meetup</button>
            </div>
        </form>
    </Card>
}

export default NewMeetupForm;