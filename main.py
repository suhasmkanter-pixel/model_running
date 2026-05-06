import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

# Load dataset
df = pd.read_csv("https://raw.githubusercontent.com/justmarkham/pycon-2016-tutorial/master/data/sms.tsv", sep='\t', names=["label", "message"])

# Convert labels
df['label'] = df['label'].map({'ham': 0, 'spam': 1})

# Text → numbers
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df['message'])

y = df['label']

# Train model
model = MultinomialNB()
model.fit(X, y)

# Save model
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))