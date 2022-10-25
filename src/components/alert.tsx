import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { alertAtom } from "../atom";


interface IAlarm {
    src: string;
    show: string;
}

const Alarms = styled(motion.div)`
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 99;
    display: flex;
    flex-wrap: wrap-reverse;
    width: 260px;
`;


const Alarm = styled(motion.div) <IAlarm>`
    display: ${props => props.show === "true" ? "block" : "none"};
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 3px 18px rgba(85,85,85,.29);
    margin-top: 10px;
    padding: 20px 30px 20px 70px;
    font-weight: bold;
    background-image: url(${props => props.src});
    background-color: #fff;
    background-size: 24px;
    background-position: 25px center;
    background-repeat: no-repeat;
    z-index: 99;
`;


export const Alert = () => {
    const setAlertAtom = useSetRecoilState(alertAtom);
    const alerts = useRecoilValue(alertAtom);

    useEffect(() => {
        if (alerts.length === 0) return;
        const lastAlert = alerts[alerts.length - 1];

        setTimeout(() => {
            setAlertAtom((currVal) => currVal.filter((alert) => alert.id !== lastAlert.id));
        }, 3000)
    }, [alerts]);
    
    return (
        <Alarms>
            {alerts.map((alert) =>
                <Alarm
                    src={alert.icon}
                    key={`alert${alert.id}`}
                    initial={{ x: 500 }}
                    animate={{ x: 0 }}
                    exit={{ x: 500, transition: {duration: 1} }}
                    transition={{ duration: 0.8 }}
                    show={alert.show}
                >
                    {alert.text}
                </Alarm>
            )}
        </Alarms>
    );
};