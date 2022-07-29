import axios from "axios";
import {useForm} from "react-hook-form";
import {ReactElement, useState} from "react";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure,
    useToast
} from "@chakra-ui/react";

type EditCustomerProps = {
    isOpen: boolean;
    onReloadCustomers: () => void;
    onCloseCustomerCreateModal: () => void;
}

export function CreateCustomerModal(props: EditCustomerProps): ReactElement {
    const {onCloseCustomerCreateModal, onReloadCustomers} = props;

    const toast = useToast();
    const {isOpen, onClose} = useDisclosure({
        isOpen: props.isOpen
    });

    const [isLoadingCreateCustomerApi, setIsLoadingCreateCustomerApi] = useState<boolean>();

    const {register, handleSubmit, formState: {errors}, reset} = useForm<Partial<Customer>>();

    const onSubmit = (data: Partial<Customer>): void => {
        setIsLoadingCreateCustomerApi(true)
        axios.post('/api/customer', {
            ...data,
            averageRating: Number(data.averageRating),
            numberOfRides: Number(data.numberOfRides)
        })
            .then((res) => {
                toast({
                    title: 'Success',
                    status: 'success',
                    description: 'Customer created successfully!',
                });
                reset();
                onReloadCustomers();
                onCloseCustomerCreateModal();
            })
            .catch((error) => {
                toast({
                    status: 'error',
                    title: 'Request Failed',
                    description: error.message,
                });
            })
            .finally(() => setIsLoadingCreateCustomerApi(false));
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={(): void => {
                    onClose();
                    onCloseCustomerCreateModal();
                }}
            >
                <ModalOverlay/>
                <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Create Customer</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody as={Stack} spacing="18px">
                        <FormControl isInvalid={!!errors.fullName}>
                            <FormLabel htmlFor='fullName'>Full Name</FormLabel>
                            <Input type='text' {...register("fullName", {required: 'Full name field is required'})}/>
                            <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.currentLocation}>
                            <FormLabel htmlFor='currentLocation'>Current Location</FormLabel>
                            <Input
                                type='text' {...register("currentLocation", {required: 'Current location field is required'})}/>
                            <FormErrorMessage>{errors?.currentLocation?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.numberOfRides}>
                            <FormLabel htmlFor='numberOfRides'>Number of Rides</FormLabel>
                            <Input
                                type='number' {...register("numberOfRides", {required: 'Number of rides field is required'})}/>
                            <FormErrorMessage>{errors?.currentLocation?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.averageRating}>
                            <FormLabel htmlFor='averageRating'>Average Rating</FormLabel>
                            <Input
                                type='number' {...register("averageRating", {required: 'Average rating field is required'})}/>
                            <FormErrorMessage>{errors?.averageRating?.message}</FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter as={Stack} spacing='12px' isInline>
                        <Button
                            type='button'
                            variant='ghost'
                            onClick={(): void => {
                                onClose();
                                onCloseCustomerCreateModal();
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            type='submit'
                            boxShadow='sm'
                            colorScheme='blue'
                            isLoading={isLoadingCreateCustomerApi}
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}