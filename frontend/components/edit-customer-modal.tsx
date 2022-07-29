import {ReactElement, useEffect, useState} from "react";
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
    Spinner,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import axios from "axios";

type EditCustomerProps = {
    isOpen: boolean;
    customerId?: string;
    onReloadCustomers: () => void;
    onCloseCustomerEditModal: () => void;
}

export function EditCustomerModal(props: EditCustomerProps): ReactElement {
    const {customerId, onCloseCustomerEditModal, onReloadCustomers} = props;

    const toast = useToast();
    const {isOpen, onClose} = useDisclosure({
        isOpen: props.isOpen
    });

    const [customer, setCustomer] = useState<Partial<Customer>>({});

    const [isLoadingGetCustomerApi, setIsLoadingGetCustomerApi] = useState<boolean>();
    const [isLoadingUpdateCustomerApi, setIsLoadingUpdateCustomerApi] = useState<boolean>();

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<Partial<Customer>>();

    useEffect((): void => {
        if (!customerId) return;

        setIsLoadingGetCustomerApi(true)
        axios.get(`/api/customer/${customerId}`)
            .then((res) => setCustomer(res.data))
            .catch((error) => {
                toast({
                    status: 'error',
                    title: 'Request Failed',
                    description: error.message,
                });
                onCloseCustomerEditModal();
                onReloadCustomers();
            })
            .finally(() => setIsLoadingGetCustomerApi(false));
    }, [customerId]);

    useEffect(() => {
        if (!Object.values(customer).length) return

        setValue('name', customer.name);
        setValue('numberOfRides', customer.numberOfRides);
        setValue('rating', customer.rating);
        setValue('locationLatitude', customer.locationLatitude);
        setValue('locationLongitude', customer.locationLongitude);
    }, [customer]);

    const onSubmit = (data: Partial<Customer>): void => {
        setIsLoadingUpdateCustomerApi(true)
        axios.put(`/api/customer/${customerId}`, {
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
                    description: 'Customer updated successfully!',
                });
                reset();
                setCustomer(res.data);
                onCloseCustomerEditModal();
            })
            .catch((error) => {
                toast({
                    status: 'error',
                    title: 'Request Failed',
                    description: error.message,
                });
            })
            .finally(() => setIsLoadingUpdateCustomerApi(false));
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={(): void => {
                    onClose();
                    onCloseCustomerEditModal();
                }}
            >
                <ModalOverlay/>
                <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
                    {isLoadingGetCustomerApi && (
                        <ModalBody>
                            <Stack isInline py="25px" justifyContent='center' spacing="14px">
                                <Spinner/>
                                <Text>Loading customer...</Text>
                            </Stack>
                        </ModalBody>
                    )}
                    {!isLoadingGetCustomerApi && (
                        <>
                            <ModalHeader>Edit Customer</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody as={Stack} spacing="18px">
                                <FormControl isInvalid={!!errors.name}>
                                    <FormLabel htmlFor='name'>Name</FormLabel>
                                    <Input
                                        type='text' {...register("name", {required: 'Name field is required'})}/>
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
                                        type='text' {...register("rating", {required: 'Average rating field is required'})}/>
                                    <FormErrorMessage>{errors?.rating?.message}</FormErrorMessage>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter as={Stack} spacing='12px' isInline>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    onClick={(): void => {
                                        onClose();
                                        onCloseCustomerEditModal();
                                    }}
                                >
                                    Close
                                </Button>
                                <Button
                                    type='submit'
                                    boxShadow='sm'
                                    colorScheme='blue'
                                    isLoading={isLoadingUpdateCustomerApi}
                                >
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}