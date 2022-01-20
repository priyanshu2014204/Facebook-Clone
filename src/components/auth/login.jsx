import { Box, Button, Container, Divider, Grid, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginfailure, loginsuccess } from "../../featuresRedux/auth/action"
import { Signup } from './Signup';
import { saveData } from '../../utils/localstore';
import { loadData } from '../../utils/localstore';
import { useSelector } from 'react-redux';

export const Login = () => {

    const {isAuth, token}=useSelector(state=> ({isAuth:state.isAuth, todos:state.token }));

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();


    const form = { email: email, password: password }

    const handleLogin = () => {
        fetch("http://localhost:1234/login", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                dispatch(loginsuccess(res.token));
                saveData("userdata",res)
                console.log(loadData("userdata"));
                navigate('/');
                setEmail('');
                setPassword('');
            })
            .catch((e) => {
                console.log(e);
                dispatch(loginfailure(e));
            })
    }


    return !isAuth? (<div>Flase credentials</div>): (
        
        <>
            <Box bg={'#f0f2f5'} h={'700px'}>
                <Grid templateColumns='repeat(2, 1fr)' maxW={'1100px'} m={'auto'} h={'600px'} >

                    <Box mt={'160px'} py={5} ps={8} pe={2}>
                        <Heading color={'#1877f2'} fontSize={60} mb={4}>facebook</Heading>
                        <Text lineHeight={1.2} fontWeight={500} fontSize={26}>Facebook helps you connect and share with the people in your life.</Text>
                    </Box>

                    <Box >
                        <Container h={'350px'} maxW={'400px'} mt={'120px'} bg={'white'} boxShadow={'lg'} rounded={10} p={4}>
                            <VStack gap={2}>
                                <Input type='email' value={email} placeholder='Email address' h={'50px'} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                                <Input type='password' value={password} placeholder='Password' h={'50px'} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                                <Button onClick={handleLogin} w={'100%'} type='submit' bg={'#1877f2'} color={'white'} fontWeight={500} size='lg' _hover={{ bg: '#2572d6' }} fontSize={20}>Log In</Button>
                                <Text>Forgotten password?</Text>
                                <Divider />

                                <Signup />

                            </VStack>
                        </Container>
                    </Box>

                </Grid>
            </Box>
        </>
    );
};