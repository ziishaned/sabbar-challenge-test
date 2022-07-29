import {ReactElement} from "react";

type DeleteCustomerModalProps = {
    isOpen: boolean;
    customerId?: string;
    onCloseCustomerDeleteModal: () => void;
}

export function DeleteCustomerModal(props: DeleteCustomerModalProps): ReactElement {
    const {customerId} = props;

    return (
        <div>DeleteCustomerModal</div>
    );
}