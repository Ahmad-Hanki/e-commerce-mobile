import { useMutation, useQueryClient } from '@tanstack/react-query';
import { email, z } from 'zod';
import { auth } from '@/config/firebaseConfig';
import { MutationConfig } from '@/lib/react-query';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import apiClient from '@/lib/api-client';

export const InputSchema = z.object({
  email: email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type Input = z.infer<typeof InputSchema>;

export const Login = async ({ data }: { data: Input }) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    console.error(error);
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
      //   queryClient.invalidateQueries({
      //     queryKey: getDiscussionsQueryOptions().queryKey,
      //   });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: Login,
  });
};

export const SignUp = async ({ data }: { data: Input }) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const res = await apiClient.post(
      'http://192.168.1.103:3000/api/auth/signup',
      {
        email: email,
        firebaseId: user.user.uid,
        name: 'Ahmad Hanki',
      },
      { requireAuth: true } // Use the new property name
    );

    if (res.status == 200) {
      Alert.alert('User created successfully');
    } else {
      Alert.alert('User not created');
    }
  } catch (error) {
    console.error(error);
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
      //   queryClient.invalidateQueries({
      //     queryKey: getDiscussionsQueryOptions().queryKey,
      //   });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: SignUp,
  });
};
