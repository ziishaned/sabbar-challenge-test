import axios from "axios";
import {FiEdit, FiTrash} from "react-icons/fi";
import {ReactElement, useEffect, useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    Heading,
    Select,
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
import {useRouter} from "next/router";

type HomeProps = {
    page: number;
    limit: number;
    isDriver: 'true' | 'false';
}

function Home(props: HomeProps): ReactElement {
    const {page, limit, isDriver} = props;

    const toast = useToast();
    const {push: navigate, query} = useRouter();

    const [totalRows, setTotalRows] = useState<number>();
    const [totalPages, setTotalPages] = useState<number>(0);
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
    }, [toggleReloadCustomers, query]);

    const getCustomers = (): void => {
        setIsLoadingGetCustomersApi(true)
        axios.get(`/api/customer?limit=${Number(limit)}&page=${Number(page)}${isDriver ? `&isDriver=${isDriver}` : ''}`)
            .then((res) => {
                setTotalRows(res.data.count);
                setCustomers(res.data.customers);
                setTotalPages(res.data.totalPages);
            })
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

            <Stack maxWidth="70%" margin="auto" spacing="16px" my="16px">
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
                {!isLoadingGetCustomersApi && (
                    <>
                        <Stack isInline justifyContent='space-between' alignItems='center'>
                            <Checkbox
                                isChecked={isDriver === 'true'}
                                onChange={(event) => {
                                    navigate(`/?page=${page}&limit=${limit}&isDriver=${event.target.checked}`);
                                }}
                            >
                                Show drivers only
                            </Checkbox>
                            <Stack isInline spacing="16px" alignItems='center' flex={0.4} justifyContent='flex-end'>
                                <Button
                                    size='sm'
                                    boxShadow='sm'
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                >
                                    Reset Filters
                                </Button>
                                <Select
                                    width="40%"
                                    value={limit}
                                    placeholder='Rows to Display'
                                    onChange={(event): void => {
                                        if (!event.target.value) {
                                            navigate(`/?page=${page}${isDriver ? `&isDriver=${isDriver}` : ''}`);
                                            return;
                                        }

                                        navigate(`/?page=${page}&limit=${event.target.value}${isDriver ? `&isDriver=${isDriver}` : ''}`);
                                    }}
                                >
                                    <option value='10'>10</option>
                                    <option value='20'>20</option>
                                    <option value='30'>30</option>
                                </Select>
                            </Stack>
                        </Stack>
                        <TableContainer>
                            <Table variant='striped' borderWidth='1px'>
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Is Driver?</Th>
                                        <Th>Longitude</Th>
                                        <Th>Latitude</Th>
                                        <Th isNumeric>Number of Rides</Th>
                                        <Th isNumeric>Rating</Th>
                                        <Th/>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {!customers.length && (
                                        <tr>
                                            <Td colSpan={7} textAlign='center' py="35px">No data to display!</Td>
                                        </tr>
                                    )}
                                    {!!customers.length && (
                                        <>
                                            {customers.map((customer: Customer): ReactElement => (
                                                <Tr key={customer._id}>
                                                    <Td>{customer.name || '-'}</Td>
                                                    <Td>{customer.isDriver ? 'Yes' : 'No'}</Td>
                                                    <Td>{customer.locationLongitude || '-'}</Td>
                                                    <Td>{customer.locationLatitude || '-'}</Td>
                                                    <Td isNumeric>{customer.numberOfRides}</Td>
                                                    <Td isNumeric>{customer.rating}</Td>
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
                        {!!customers.length && (
                            <Stack isInline spacing='12px' justifyContent='space-between' alignItems='center'>
                                <Box />
                                <Stack isInline justifyContent='center' spacing='14px'>
                                    <Button
                                        size='sm'
                                        boxShadow='sm'
                                        colorScheme='blue'
                                        isDisabled={page === 1}
                                        onClick={(): void => {
                                            navigate(`/?page=${page - 1}&limit=${limit}${isDriver ? `&isDriver=${isDriver}` : ''}`);
                                        }}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        size='sm'
                                        boxShadow='sm'
                                        colorScheme='blue'
                                        isDisabled={page === totalPages}
                                        onClick={(): void => {
                                            navigate(`/?page=${page + 1}&limit=${limit}${isDriver ? `&isDriver=${isDriver}` : ''}`);
                                        }}
                                    >
                                        Next
                                    </Button>
                                </Stack>
                                <Text color='gray' fontSize='sm'>{totalRows} Rows</Text>
                            </Stack>
                        )}
                    </>
                )}
            </Stack>
        </>
    );
}

Home.getInitialProps = (ctx: Record<any, any>): HomeProps => {
    const {limit = 10, page = 1, isDriver} = ctx.query;

    return {
        isDriver,
        page: Number(page),
        limit: Number(limit),
    };
};

export default Home;