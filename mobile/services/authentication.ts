import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { email, z } from 'zod';
import { auth } from '@/config/firebaseConfig';
import { MutationConfig, QueryConfig } from '@/lib/react-query';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import apiClient from '@/lib/api-client';
import { User } from '@/types/api-types';

export const SignInScheme = z.object({
  email: email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignInInputScheme = z.infer<typeof SignInScheme>;

export const Login = async ({ data }: { data: SignInInputScheme }) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    Alert.alert('Error logging in');
    throw error;
  }
};

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof Login>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUserQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: Login,
  });
};
////////////////////////////////////////////////////////////////

export const SignUpInputScheme = z.object({
  email: email({ message: 'Invalid email address' }),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignUpInputScheme = z.infer<typeof SignUpInputScheme>;

export const SignUp = async ({ data }: { data: SignUpInputScheme }) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const res = await apiClient.post(`/user`, {
      email: data.email,
      firebaseUid: user.user.uid,
      name: data.name,
    });

    if (res.status == 200) {
      Alert.alert('User created successfully');
    }
  } catch (error) {
    Alert.alert('Error creating user');
    throw error;
  }
};
type UseSignUpOptions = {
  mutationConfig?: MutationConfig<typeof SignUp>;
};

export const useSignUp = ({ mutationConfig }: UseSignUpOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUserQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: SignUp,
  });
};

/////////////////////////////// logout ///////////////////////
export async function signOutUser() {
  try {
    await auth.signOut();
    console.log('User signed out, tokens cleared');
  } catch (error) {
    console.error('Failed to sign out:', error);
  }
}

export const useSignOut = ({ mutationConfig }: UseSignUpOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUserQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signOutUser,
  });
};

/////////////////////////////// get user ///////////////////////

export const getUser = async (): Promise<{ user: User } | null> => {
  const response = await apiClient.get('/user', { requireAuth: true });
  return response.data;
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = ({ queryConfig }: UseUserOptions = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...queryConfig,
  });
};
