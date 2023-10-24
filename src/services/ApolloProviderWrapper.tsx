import { FC, ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

const ApolloProviderWrapper: FC<ApolloProviderWrapperProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default ApolloProviderWrapper;
