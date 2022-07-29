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
            locationLongitude: Number(data.locationLongitude),
            locationLatitude: Number(data.locationLatitude),
            rating: Number(data.rating),
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
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel htmlFor='name'>Name</FormLabel>
                            <Input type='text' {...register("name", {required: 'Name field is required'})}/>
                            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.locationLongitude}>
                            <FormLabel htmlFor='locationLongitude'>Location Longitude</FormLabel>
                            <Input
                                type='text' {...register("locationLongitude", {required: 'Location longitude field is required'})}/>
                            <FormErrorMessage>{errors?.locationLongitude?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.locationLatitude}>
                            <FormLabel htmlFor='locationLatitude'>Location Latitude</FormLabel>
                            <Input
                                type='text' {...register("locationLatitude", {required: 'Location latitude field is required'})}/>
                            <FormErrorMessage>{errors?.locationLatitude?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.numberOfRides}>
                            <FormLabel htmlFor='numberOfRides'>Number of Rides</FormLabel>
                            <Input
                                type='text' {...register("numberOfRides", {required: 'Number of rides field is required'})}/>
                            <FormErrorMessage>{errors?.numberOfRides?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.rating}>
                            <FormLabel htmlFor='rating'>Rating</FormLabel>
                            <Input
                                type='text' {...register("rating", {required: 'Rating field is required'})}/>
                            <FormErrorMessage>{errors?.rating?.message}</FormErrorMessage>
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