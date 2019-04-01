import _ from 'lodash';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

export const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export const getCandidateTableHeaderCells = () => {
    return [
        { label: 'Name', name: 'name', isFilter: true, isSort: false },
        { label: 'Email', name: 'email', isFilter: false, isSort: false },
        { label: 'Age', name: 'birth_date', isFilter: false, isSort: false },
        { label: 'Years of Experience', name: 'year_of_experience', isFilter: false, isSort: true },
        { label: 'Position Applied', name: 'position_applied', isFilter: true, isSort: true },
        { label: 'Applied', name: 'application_date', isFilter: false, isSort: true },
        { label: 'Status', name: 'status', isFilter: true, isSort: false }
    ]
}

export const getFilterdResult = (items, val) => {
    return _.filter(
        items,
        item =>
            item.name.toLowerCase().indexOf(val) !== -1 ||
            item.status.toLowerCase().indexOf(val) !== -1 ||
            item.position_applied.toLowerCase().indexOf(val) !== -1
    );
}
