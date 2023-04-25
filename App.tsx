import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flexGrow: 1,
  };

  const isValid = useCallback(
    (password: string, checkType: 'length' | 'capital' | 'number') => {
      if (!password || !password.length) {
        return false;
      }
      switch (checkType) {
        case 'length':
          return password.length >= 8;
        case 'capital':
          return new RegExp('^(?=.*[A-Z]).+$').test(password);
        case 'number':
          return new RegExp('^([a-zA-Z]+[0-9]+[a-zA-Z]+)+$').test(password);
        default:
          return false;
      }
    },
    [],
  );

  const isPasswordValid = useCallback((password: string) => {
    return (
      isValid(password, 'length') &&
      isValid(password, 'capital') &&
      isValid(password, 'number')
    );
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.content}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Password Checker</Text>
        </View>

        <View style={styles.interactionContainer}>
          <Text style={styles.message}>
            Please enter password in field below so we can validate it
          </Text>

          <TextInput
            autoCapitalize="none"
            style={[
              styles.textInput,
              {
                borderColor:
                  inputValue.length === 0
                    ? '#000'
                    : isPasswordValid(inputValue)
                    ? 'green'
                    : 'red',
              },
            ]}
            value={inputValue}
            onChangeText={text => {
              setInputValue(text);
            }}
          />

          <View style={styles.validationContainer}>
            <ValidationItem
              text="Must contain at least 8 characters."
              isValid={isValid(inputValue, 'length')}
              noInput={inputValue.length === 0}
            />
            <ValidationItem
              text="Must contain at least one capital letter."
              isValid={isValid(inputValue, 'capital')}
              noInput={inputValue.length === 0}
            />
            <ValidationItem
              text="Number inside must separate password in at least two character letter arrays."
              isValid={isValid(inputValue, 'number')}
              noInput={inputValue.length === 0}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

type IValidationItemProps = {
  text: string;
  isValid: boolean;
  noInput: boolean;
};

const ValidationItem: React.FC<IValidationItemProps> = ({
  text,
  isValid,
  noInput,
}) => {
  return (
    <View style={styles.validationItemContainer}>
      <Text
        style={[
          styles.validationItemText,
          {color: noInput ? '#000' : isValid ? 'green' : 'red'},
        ]}>
        {text}
      </Text>
    </View>
  );
};

export {App};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 10,
  },
  headingContainer: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 30,
    fontWeight: '700',
  },
  interactionContainer: {
    flexGrow: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
  },
  textInput: {
    width: '80%',
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  validationContainer: {
    marginTop: 10,
    width: '80%',
  },
  validationItemContainer: {marginTop: 7},
  validationItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default App;
