import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Select,
  Button,
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
    General_Health: 'Excellent',
    Checkup: 'Within the past year',
    Exercise: 'Yes',
    Skin_Cancer: 'No',
    Other_Cancer: 'No',
    Depression: 'No',
    Diabetes: 'No',
    Arthritis: 'No',
    Sex: 'Male',
    Age_Category: '18-24',
    'Height_(cm)': 170, // Corrected column name
    'Weight_(kg)': 70, // Corrected column name
    BMI: 25,
    Smoking_History: 'No',
    Alcohol_Consumption: 0,
    Fruit_Consumption: 0,
    Green_Vegetables_Consumption: 0,
    FriedPotato_Consumption: 0,
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
              onChange={(e) => setFormData({ ...formData, 'Height_(cm)': e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Weight (kg)</FormLabel>
            <Input
              type="number"
              value={formData['Weight_(kg)']}
              onChange={(e) => setFormData({ ...formData, 'Weight_(kg)': e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>BMI</FormLabel>
            <Input
              type="number"
              value={formData.BMI}
              onChange={(e) => setFormData({ ...formData, BMI: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, Alcohol_Consumption: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Fruit Consumption (servings per week)</FormLabel>
            <Input
              type="number"
              value={formData.Fruit_Consumption}
              onChange={(e) => setFormData({ ...formData, Fruit_Consumption: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Green Vegetables Consumption (servings per week)</FormLabel>
            <Input
              type="number"
              value={formData.Green_Vegetables_Consumption}
              onChange={(e) =>
                setFormData({ ...formData, Green_Vegetables_Consumption: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Fried Potato Consumption (servings per week)</FormLabel>
            <Input
              type="number"
              value={formData.FriedPotato_Consumption}
              onChange={(e) =>
                setFormData({ ...formData, FriedPotato_Consumption: e.target.value })
              }
            />
          </FormControl>

          {/* Repeat similar FormControl components for other fields */}
          
          <Button type="submit" colorScheme="teal" mt={4}>
            Submit
          </Button>
        </form>
      </Box>

      {predictionResult !== null && (
        <Box mt={4}>
          <Heading as="h2" size="md">
            Prediction Result:
          </Heading>
          <Box>
            {predictionResult === 0 ? (
              <Text color="red.500">You are at a low risk of cardiovascular disease.</Text>
            ) : (
              <Text color="green.500">You are at a high risk of cardiovascular disease.</Text>
            )}
          </Box>
        </Box>
      )}

    </ChakraProvider>
  );
};

export default App;