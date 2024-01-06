import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Alert,
  Select,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const ageCategoryOptions = [
  '18-24',
  '25-29',
  '30-34',
  '35-39',
  '40-44',
  '45-49',
  '50-54',
  '55-59',
  '60-64',
  '65-69',
  '70-74',
  '75-79',
  '80+',
];

const App = () => {

  const [predictionResult, setPredictionResult] = useState(null);

  const [formData, setFormData] = useState({
    General_Health: 'Fair',
    Checkup: 'Within the past 2 years',
    Exercise: 'No',
    Skin_Cancer: 'No',
    Other_Cancer: 'No',
    Depression: 'Yes',
    Diabetes: 'Yes',
    Arthritis: 'No',
    Sex: 'Male',
    Age_Category: '65-69',
    'Height_(cm)': 26, // Corrected column name
    'Weight_(kg)': 32, // Corrected column name
    BMI: 47,
    Smoking_History: 'Yes',
    Alcohol_Consumption: 47,
    Fruit_Consumption: 36,
    Green_Vegetables_Consumption: 88,
    FriedPotato_Consumption: 48,
  });
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jsonData = {
      features: {
        General_Health: [formData.General_Health],
        Checkup: [formData.Checkup],
        Exercise: [formData.Exercise],
        Skin_Cancer: [formData.Skin_Cancer],
        Other_Cancer: [formData.Other_Cancer],
        Depression: [formData.Depression],
        Diabetes: [formData.Diabetes],
        Arthritis: [formData.Arthritis],
        Sex: [formData.Sex],
        Age_Category: [formData.Age_Category],
        'Height_(cm)': [formData['Height_(cm)']], // Corrected column name
        'Weight_(kg)': [formData['Weight_(kg)']], // Corrected column name
        BMI: [formData.BMI],
        Smoking_History: [formData.Smoking_History],
        Alcohol_Consumption: [formData.Alcohol_Consumption],
        Fruit_Consumption: [formData.Fruit_Consumption],
        Green_Vegetables_Consumption: [formData.Green_Vegetables_Consumption],
        FriedPotato_Consumption: [formData.FriedPotato_Consumption],
      },
    };


    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error('Prediction request failed');
      }

      const data = await response.json();
      setPredictionResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show a message, etc.
    }

    // Handle form submission logic here
    console.log(jsonData);
  };

  return (    
    <ChakraProvider>
      <Box m={16}>
        <Box
          maxW="xl"
          m="auto"
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Heading as="h4" mb={4} textAlign="center">
            Coronary Disease Risk Prediction App
          </Heading>
          <Accordion allowToggle>
            {/* Accordion 1: Disclaimer */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Disclaimer
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {/* Disclaimer content goes here */}
                <Text>
                  This Coronary Disease Risk Prediction model was trained using a dataset and does not replace medical
                  consultancy. Please consult with a healthcare professional for accurate medical advice.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            {/* Accordion 2: Form */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Fill Form
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {/* Your form goes here */}
                <form onSubmit={handleSubmit}>
                  <FormControl mb={4}>
                    <FormLabel>How would you describe your general health?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.General_Health}
                      onChange={(e) => setFormData({ ...formData, General_Health: e.target.value })}
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>When was your last checkup?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Checkup}
                      onChange={(e) => setFormData({ ...formData, Checkup: e.target.value })}
                    >
                      <option value="Within the past year">Within the past year</option>
                      <option value="Within the past 2 years">Within the past 2 years</option>
                      <option value="Within the past 5 years">Within the past 5 years</option>
                      <option value="5 or more years ago">5 or more years ago</option>
                      <option value="Never">Never</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Do you engage in physical exercise often?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Exercise}
                      onChange={(e) => setFormData({ ...formData, Exercise: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Have you been diagnosed with Skin Cancer?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Skin_Cancer}
                      onChange={(e) => setFormData({ ...formData, Skin_Cancer: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Have you been diagnosed with Other Cancer?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Other_Cancer}
                      onChange={(e) => setFormData({ ...formData, Other_Cancer: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Have you experienced Depression?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Depression}
                      onChange={(e) => setFormData({ ...formData, Depression: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Have you been diagnosed with Diabetes?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Diabetes}
                      onChange={(e) => setFormData({ ...formData, Diabetes: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Have you been diagnosed with Arthritis?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Arthritis}
                      onChange={(e) => setFormData({ ...formData, Arthritis: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Sex}
                      onChange={(e) => setFormData({ ...formData, Sex: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Age Category</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Age_Category}
                      onChange={(e) => setFormData({ ...formData, Age_Category: e.target.value })}
                    >
                      {ageCategoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Height (cm)</FormLabel>
                    <Input
                      type="number"
                      value={formData['Height_(cm)']}
                      onChange={(e) => setFormData({ ...formData, 'Height_(cm)': parseFloat(e.target.value) })}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Weight (kg)</FormLabel>
                    <Input
                      type="number"
                      value={formData['Weight_(kg)']}
                      onChange={(e) => setFormData({ ...formData, 'Weight_(kg)': parseFloat(e.target.value) })}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>BMI</FormLabel>
                    <Input
                      type="number"
                      value={formData.BMI}
                      onChange={(e) => setFormData({ ...formData, BMI: parseFloat(e.target.value) })}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Have you ever smoked?</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={formData.Smoking_History}
                      onChange={(e) => setFormData({ ...formData, Smoking_History: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Alcohol Consumption (units per week)</FormLabel>
                    <Input
                      type="number"
                      value={formData.Alcohol_Consumption}
                      onChange={(e) => setFormData({ ...formData, Alcohol_Consumption: parseFloat(e.target.value) })}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Fruit Consumption (servings per week)</FormLabel>
                    <Input
                      type="number"
                      value={formData.Fruit_Consumption}
                      onChange={(e) => setFormData({ ...formData, Fruit_Consumption: parseFloat(e.target.value) })}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Green Vegetables Consumption (servings per week)</FormLabel>
                    <Input
                      type="number"
                      value={formData.Green_Vegetables_Consumption}
                      onChange={(e) =>
                        setFormData({ ...formData, Green_Vegetables_Consumption: parseFloat(e.target.value) })
                      }
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Fried Potato Consumption (servings per week)</FormLabel>
                    <Input
                      type="number"
                      value={formData.FriedPotato_Consumption}
                      onChange={(e) =>
                        setFormData({ ...formData, FriedPotato_Consumption: parseFloat(e.target.value) })
                      }
                    />
                  </FormControl>              
                  <Button type="submit" colorScheme="teal" mt={4}>
                    Submit
                  </Button>
                </form>
              </AccordionPanel>
            </AccordionItem>

            {/* Accordion 3: Prediction Results */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Prediction Results
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {/* Prediction results go here */}
                {predictionResult !== null && (
                    <Box>
                      {predictionResult === 0 ? (
                        <Alert status="success">
                          You are at a low risk of cardiovascular disease.
                        </Alert>
                      ) : (
                        <Alert status="error">
                          You are at a high risk of cardiovascular disease.
                        </Alert>
                      )}
                    </Box>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;