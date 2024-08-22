import React, { useState } from 'react';

const GeneratePassword = () => {
    const [length, setLength] = useState(12);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [isStrong, setIsStrong] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); 

    const generatePassword = () => {
        let charset = '';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (charset === '') {
            alert('Необходимо выбрать хотя бы один тип символов');
            return;
        }

        let newPassword = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            newPassword += charset.charAt(Math.floor(Math.random() * n));
        }

        setPassword(newPassword);
        setIsStrong(null); 
        setErrorMessage(''); 
    };

    const isStrongPassword = (password) => {
        if (password.length < 8) {
            return false;
        }

        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*()_+~`|}{[\]:;?><,./\-]/.test(password); 

        return hasLowerCase && hasUpperCase && hasDigit && hasSymbol;
    };

    const handleCheckPassword = () => {
        if (!password) {
            setErrorMessage('Напишите пароль');
            setIsStrong(null);
        } else {
            setErrorMessage(''); 
            setIsStrong(isStrongPassword(password));
        }
    };

    return (
        <div>
            <div>
                <label htmlFor="length">Длина Пароля:</label>
                <input 
                    type="number" 
                    id="length" 
                    value={length} 
                    min="4" 
                    max="20" 
                    onChange={(e) => setLength(parseInt(e.target.value))}
                />
                <br />
                <input 
                    type="checkbox" 
                    id="include-lowercase" 
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)} 
                />
                <label htmlFor="include-lowercase">Строчные буквы (a-z)</label>
                <br />
                <input 
                    type="checkbox" 
                    id="include-uppercase" 
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)} 
                />
                <label htmlFor="include-uppercase">Заглавные буквы (A-Z)</label>
                <br />
                <input 
                    type="checkbox" 
                    id="include-numbers" 
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)} 
                />
                <label htmlFor="include-numbers">Цифры (0-9)</label>
                <br />
                <input 
                    type="checkbox" 
                    id="include-symbols" 
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)} 
                />
                <label htmlFor="include-symbols">Специальные символы (!@#$%^&*)</label>
                <br />
                <button onClick={generatePassword}>Сгенерировать с данными настройками</button>
                <p>Сгенерированный пароль: <span>{password}</span></p>

                <button onClick={handleCheckPassword}>Проверить надежность</button>
                <p style={{ color: 'red' }}>{errorMessage}</p> 
                <p>
                    Надежность пароля: {isStrong === null ? 'Проверьте пароль' : (isStrong ? 'Надежный' : 'Ненадежный')}
                </p>
            </div>
        </div>
    );
}

export default GeneratePassword;
