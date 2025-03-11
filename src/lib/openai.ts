import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Fonction pour générer une description de livre
export const generateBookDescription = async (
  title: string,
  theme: string,
  ageRange: string
) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Vous êtes un expert en littérature jeunesse qui crée des descriptions engageantes pour des livres personnalisés."
        },
        {
          role: "user",
          content: `Créez une description captivante pour un livre personnalisé intitulé "${title}" sur le thème "${theme}" pour des enfants de ${ageRange}. La description doit être adaptée aux enfants et à leurs parents.`
        }
      ],
      max_tokens: 200
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de la génération de la description:', error);
    throw error;
  }
};

// Fonction pour générer une histoire
export const generateStory = async (
  title: string,
  theme: string,
  childName: string,
  age: number
) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Vous êtes un auteur de littérature jeunesse expert qui crée des histoires personnalisées et éducatives."
        },
        {
          role: "user",
          content: `Créez une histoire personnalisée pour ${childName}, ${age} ans, intitulée "${title}" sur le thème "${theme}". L'histoire doit être adaptée à son âge et inclure des éléments éducatifs.`
        }
      ],
      max_tokens: 1000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'histoire:', error);
    throw error;
  }
};

// Fonction pour générer une illustration avec DALL-E
export const generateIllustration = async (
  prompt: string,
  style: string = 'digital art'
) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${prompt} Style: ${style}. Appropriate for children's book illustration.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'illustration:', error);
    throw error;
  }
};