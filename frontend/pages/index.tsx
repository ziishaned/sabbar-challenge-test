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

export default function Home(): ReactElement {
    const toast = useToast();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoadingGetCustomersApi, setIsLoadingGetCustomersApi] = useState<boolean>();

    const [customerIdToEdit, setCustomerIdToEdit] = useState<string>();
    const [toggleCustomerEditModal, setToggleCustomerEditModal] = useState<boolean>(false);

    useEffect((): void => {
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
    }, []);

    return (
        <>
            <EditCustomerModal
                customerId={customerIdToEdit}
                isOpen={toggleCustomerEditModal}
                onCloseCustomerEditModal={() => setToggleCustomerEditModal(!toggleCustomerEditModal)}
            />

            <Stack maxWidth="70%" margin="auto" spacing="16px" mt="16px">
                <Heading as='h3' size='lg'>Customers</Heading>
                {isLoadingGetCustomersApi && (
                    <Stack isInline py="25px" justifyContent='center' spacing="14px">
                        <Spinner/>
                        <Text>Loading customers...</Text>
                    </Stack>
                )}
                {!!customers.length && (
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
                                                    onClick={() => {
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
                                                    colorScheme='red'
                                                    leftIcon={<FiTrash/>}
                                                >
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Stack>
        </>
    );
}