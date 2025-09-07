import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { View, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInScheme, SignInInputScheme } from '@/services/authentication';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputScheme>({
    resolver: zodResolver(SignInScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInInputScheme) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust if you have headers
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
        keyboardShouldPersistTaps="handled">
        <Card className="w-full max-w-sm">
          {/* Email */}
          <CardHeader className="px-4">
            <CardTitle>Sign In Form</CardTitle>
          </CardHeader>
          <CardContent className="mx-auto w-full max-w-md p-4">
            <View className="gap-2">
              <Label className="text-base font-medium">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="m@example.com"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="w-full"
                  />
                )}
              />
              {errors.email && (
                <Label className="text-sm text-red-500">{errors.email.message}</Label>
              )}
            </View>

            {/* Password */}
            <View className="gap-2">
              <Label className="text-base font-medium">Password</Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry
                    className="w-full"
                  />
                )}
              />
              {errors.password && (
                <Label className="text-sm text-red-500">{errors.password.message}</Label>
              )}
            </View>

            <View className="mt-4">
              <Button onPress={handleSubmit(onSubmit)} className="w-full">
                <Text className="font-medium">Sign In</Text>
              </Button>
            </View>
          </CardContent>
          <View className="flex-row gap-2">
            <Label className="pl-4">Don't have an account?</Label>
            <Link href="/(auth)/sign-up" asChild>
              <Label className="font-medium text-muted-foreground">Sign Up</Label>
            </Link>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
