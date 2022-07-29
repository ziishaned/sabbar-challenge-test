import axios from "axios";
import {FiEdit, FiTrash} from "react-icons/fi";
import {ReactElement, useEffect, useState} from "react";
import {
    Button,
    Heading,
    Spinner,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react";

import {EditCustomerModal} from "../components/edit-customer-modal";
import {DeleteCustomerModal} from "../components/delete-customer-modal";
import {CreateCustomerModal} from "../components/create-customer-modal";

export default function Home(): ReactElement {
    const toast = useToast();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [toggleReloadCustomers, setToggleReloadCustomers] = useState<boolean>();
    const [isLoadingGetCustomersApi, setIsLoadingGetCustomersApi] = useState<boolean>();

    const [customerIdToDelete, setCustomerIdToDelete] = useState<string>();
    const [toggleCustomerDeleteModal, setToggleCustomerDeleteModal] = useState<boolean>(false);

    const [customerIdToEdit, setCustomerIdToEdit] = useState<string>();
    const [toggleCustomerEditModal, setToggleCustomerEditModal] = useState<boolean>(false);

    const [toggleCustomerCreateModal, setToggleCustomerCreateModal] = useState<boolean>(false);

    useEffect((): void => {
        getCustomers();
    }, [toggleReloadCustomers]);

    const getCustomers = (): void => {
        setIsLoadingGetCustomersApi(true)
        axios.get('/api/customer')
            .then((res) => setCustomers(res.data))
            .catch((error) => {
                toast({
                    status: 'error',
                    title: 'Request Failed',
                    description: error.message,
                })
            })
            .finally(() => setIsLoadingGetCustomersApi(false));
    };

    return (
        <>
            <DeleteCustomerModal
                customerId={customerIdToDelete}
                isOpen={toggleCustomerDeleteModal}
                onReloadCustomers={(): void => setToggleReloadCustomers(!toggleReloadCustomers)}
                onCloseCustomerDeleteModal={(): void => setToggleCustomerDeleteModal(!toggleCustomerDeleteModal)}
            />
            <CreateCustomerModal
                isOpen={toggleCustomerCreateModal}
                onReloadCustomers={(): void => setToggleReloadCustomers(!toggleReloadCustomers)}
                onCloseCustomerCreateModal={(): void => setToggleCustomerCreateModal(!toggleCustomerCreateModal)}
            />
            <EditCustomerModal
                customerId={customerIdToEdit}
                isOpen={toggleCustomerEditModal}
                onReloadCustomers={(): void => setToggleReloadCustomers(!toggleReloadCustomers)}
                onCloseCustomerEditModal={(): void => setToggleCustomerEditModal(!toggleCustomerEditModal)}
            />

            <Stack maxWidth="70%" margin="auto" spacing="16px" mt="16px">
                <Stack isInline justifyContent='space-between' alignItems='center'>
                    <Heading as='h3' size='lg'>Customers</Heading>
                    <Button
                        size='sm'
                        boxShadow='sm'
                        colorScheme='blue'
                        onClick={(): void => setToggleCustomerCreateModal(!toggleCustomerCreateModal)}
                    >
                        Create
                    </Button>
                </Stack>
                {isLoadingGetCustomersApi && (
                    <Stack isInline py="25px" justifyContent='center' spacing="14px">
                        <Spinner/>
                        <Text>Loading customers...</Text>
                    </Stack>
                )}
                <TableContainer>
                    <Table variant='striped' borderWidth='1px'>
                        <Thead>
                            <Tr>
                                <Th>Full Name</Th>
                                <Th>Current Location</Th>
                                <Th isNumeric>Number of Rides</Th>
                                <Th isNumeric>Average Rating</Th>
                                <Th/>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!customers.length && (
                                <tr>
                                    <Td colSpan={5} textAlign='center' py="35px">No data to display!</Td>
                                </tr>
                            )}
                            {!!customers.length && (
                                <>
                                    {customers.map((customer: Customer): ReactElement => (
                                        <Tr key={customer._id}>
                                            <Td>{customer.fullName || '-'}</Td>
                                            <Td>{customer.currentLocation || '-'}</Td>
                                            <Td isNumeric>{customer.numberOfRides}</Td>
                                            <Td isNumeric>{customer.averageRating}</Td>
                                            <Td>
                                                <Stack isInline justifyContent='flex-end'>
                                                    <Button
                                                        size='sm'
                                                        boxShadow='sm'
                                                        onClick={(): void => {
                                                            setCustomerIdToEdit(customer._id)
                                                            setToggleCustomerEditModal(!toggleCustomerEditModal);
                                                        }}
                                                        colorScheme='blue'
                                                        leftIcon={<FiEdit/>}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size='sm'
                                                        boxShadow='sm'
                                                        colorScheme='red'
                                                        leftIcon={<FiTrash/>}
                                                        onClick={(): void => {
                                                            setCustomerIdToDelete(customer._id)
                                                            setToggleCustomerDeleteModal(!toggleCustomerDeleteModal);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Stack>
                                            </Td>
                                        </Tr>
                                    ))}
                                </>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </>
    );
}