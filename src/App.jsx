import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './App.css';
import Image1 from './assets/image1.svg';
import Image2 from './assets/image2.svg';
import Image3 from './assets/image3.svg';
import Image4 from './assets/image4.svg';
import Logo from './assets/logo.svg';

const App = () => {
    const [rates, setRates] = useState({
        USD: 'N/A',
        EUR: 'N/A',
        BRL: 'N/A',
        ARS: 'N/A'
    });
    const [dateTime, setDateTime] = useState({
        date: '',
        time: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://open.er-api.com/v6/latest/PYG');
                const data = await response.json();
                const rates = data.rates;
                setRates({
                    USD: Math.round(1 / rates.USD),
                    EUR: Math.round(1 / rates.EUR),
                    BRL: Math.round(1 / rates.BRL),
                    ARS: Math.round(1 / rates.ARS)
                });
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();

        const updateDateTime = () => {
            const paraguayTime = moment().tz('America/Asuncion');
            setDateTime({
                date: paraguayTime.format('DD/MM/YYYY'),
                time: paraguayTime.format('HH:mm:ss')
            });
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App">
            <div className="flex-item fila1">
                <img src={Logo} alt="Logo" className="logo-image" />
            </div>
            <div className="flex-item fila2">
                <div className='col2'>{dateTime.date}</div>
                <div className='col2'>{dateTime.time}</div>
            </div>
            <div className="flex-item fila3">Cotización de Monedas</div>
            <div className="flex-item fila4">
                <div className='col4'>PAIS</div>
                <div className='col4'>MONEDA</div>
                <div className='col4'>COMPRA</div>
                <div className='col4'>VENTA</div>
            </div>
            <div className="flex-item fila5">
                <div className='col5'>
                    <img src={Image1} alt="Imagen 1" className="svg-image" />
                </div>
                <div className='col5'>USD</div>
                <div className='col5'>{rates.USD}</div>
                <div className='col5'>{rates.USD}</div> {/* Ajustar según necesidad */}
            </div>
            <div className="flex-item fila6">
                <div className='col5'><img src={Image2} alt="Imagen 2" className="svg-image" /></div>
                <div className='col6'>EUR</div>
                <div className='col6'>{rates.EUR}</div>
                <div className='col6'>{rates.EUR}</div> {/* Ajustar según necesidad */}
            </div>
            <div className="flex-item fila7">
                <div className='col5'><img src={Image3} alt="Imagen 3" className="svg-image" /></div>
                <div className='col7'>BRL</div>
                <div className='col7'>{rates.BRL}</div>
                <div className='col7'>{rates.BRL}</div> {/* Ajustar según necesidad */}
            </div>
            <div className="flex-item fila8">
                <div className='col5'><img src={Image4} alt="Imagen 4" className="svg-image" /></div>
                <div className='col8'>ARS</div>
                <div className='col8'>{rates.ARS}</div>
                <div className='col8'>{rates.ARS}</div> {/* Ajustar según necesidad */}
            </div>
        </div>
    );
};

export default App;
