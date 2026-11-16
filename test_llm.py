from llm import generate_answer

question = "How do I reset my password?"

context = f"""
    To reset a password, click Forget Password on the login page.
    Enter the registered email address and follow the password reset instructions that send to your inbox.
    Check your spam folder if the email does not arrive. 
"""

answer = generate_answer(question, context)

print('User question:', question)
print('\nAI Answer:', answer)

