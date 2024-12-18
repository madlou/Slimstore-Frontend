import { Box, Table, Text } from '@mantine/core'
import React from 'react'

const DemoInstructions = (props) => {
    return (
        <Box>
            {
                props.name == 'LOGIN' ? (
                    <Box>
                        <Text>{props.uiTranslations.devmessage1}</Text>
                        <Text>{props.uiTranslations.devmessage2}</Text>
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>{props.uiTranslations.user}</Table.Th>
                                    <Table.Th>{props.uiTranslations.password}</Table.Th>
                                    <Table.Th>{props.uiTranslations.role}</Table.Th>
                                    <Table.Th>{props.uiTranslations.store}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>1111</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{props.uiTranslations.associate}</Table.Td>
                                    <Table.Td>423</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>2222</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{props.uiTranslations.manager}*</Table.Td>
                                    <Table.Td>423</Table.Td></Table.Tr>
                                <Table.Tr>
                                    <Table.Td>3333</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{props.uiTranslations.administrator}**</Table.Td>
                                    <Table.Td>600</Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                        <Text fs="italic">* {props.uiTranslations.devmessage3}</Text>
                        <Text fs="italic">** {props.uiTranslations.devmessage4}</Text>
                    </Box>
                ) : ''
            }
            {
                props.name == 'REGISTER_CHANGE' ? (
                    <Box>
                        <Text>{props.uiTranslations.devmessage1}</Text>
                        <Text>{props.uiTranslations.devmessage2}</Text>
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Td>{props.uiTranslations.store}</Table.Td>
                                    <Table.Td>{props.uiTranslations.register}</Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>423</Table.Td>
                                    <Table.Td>1</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>423</Table.Td>
                                    <Table.Td>2</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>423</Table.Td>
                                    <Table.Td>3</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>600</Table.Td>
                                    <Table.Td>1</Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Box>
                ) : ''
            }
        </Box >
    )
}

export default DemoInstructions