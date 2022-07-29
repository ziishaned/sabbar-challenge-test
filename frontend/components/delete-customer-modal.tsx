import {ReactElement, useState} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack, Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import axios from "axios";

type DeleteCustomerModalProps = {
    isOpen: boolean;
    customerId?: string;
    onReloadCustomers: () => void;
    onCloseCustomerDeleteModal: () => void;
}

export function DeleteCustomerModal(props: DeleteCustomerModalProps): ReactElement {
    const {customerId, onCloseCustomerDeleteModal, onReloadCustomers} = props;

    const toast = useToast();
    const {isOpen, onClose} = useDisclosure({
        isOpen: props.isOpen
    });

    const [isLoadingDeleteCustomerApi, setIsLoadingDeleteCustomerApi] = useState<boolean>();

    const deleteCustomer = (): void => {
        setIsLoadingDeleteCustomerApi(true)
        axios.delete(`/api/customer/${customerId}`)
            .then(() => {
                onReloadCustomers();
            })
            .catch((error) => {
                toast({
                    status: 'error',
                    title: 'Request Failed',
                    description: error.message,
                });
                onCloseCustomerDeleteModal();
            })
            .finally(() => {
                setIsLoadingDeleteCustomerApi(false);
                onCloseCustomerDeleteModal();
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={(): void => {
                onClose();
                onCloseCustomerDeleteModal();
            }}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Delete Customer</ModalHeader>
                <ModalCloseButton/>
                <ModalBody as={Stack} spacing="18px">
                    <Text>You are going to delete the customer. Are you sure?</Text>
                </ModalBody>
                <ModalFooter as={Stack} spacing='12px' isInline>
                    <Button type='button' variant='ghost' onClick={(): void => {
                        onClose();
                        onCloseCustomerDeleteModal();
                    }}>
                        No, Keep it!
                    </Button>
                    <Button
                        type='submit'
                        boxShadow='sm'
                        colorScheme='red'
                        onClick={deleteCustomer}
                        isLoading={isLoadingDeleteCustomerApi}
                    >
                        Yes, Delete!
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}