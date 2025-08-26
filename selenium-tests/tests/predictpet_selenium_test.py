from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()

try:
    driver.get("http://localhost:5173/login")
    driver.maximize_window()

    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Username']").send_keys("vlad")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']").send_keys("1234")

    login_button = driver.find_element(By.CSS_SELECTOR, "form.login-form button.action-button")
    login_button.click()

    wait = WebDriverWait(driver, 15)

    def login_successful(driver):
        return driver.execute_script("return localStorage.getItem('userValid')") == 'yes'

    wait.until(login_successful)
    print("Login reușit!")

    predict_link = wait.until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href='/predictpet']"))
    )
    predict_link.click()

    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Height (0-100)']")))
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Height (0-100)']").send_keys("30")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Weight (0-100)']").send_keys("20")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Ear Size (0-100)']").send_keys("10")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Tail Length (0-100)']").send_keys("15")

    send_button = driver.find_element(By.CSS_SELECTOR, ".section button.action-button")
    send_button.click()

    prediction_element = wait.until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "p.prediction-message"))
    )
    predicted_label = prediction_element.text
    print("Predicted label:", predicted_label)

finally:
    driver.quit()
