package com.inn.headstartdemo.utils;
import java.io.IOException;
import java.util.Random;
public class RandomGeneratorUtil {
	private static final String CHAR_LIST = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int RANDOM_STRING_LENGTH = 8;
     
    /**
     * This method generates random string
     * @return
     * @throws IOException 
     */
    
    public String generateRandomString(){
        StringBuffer randStr = new StringBuffer();
        for(int i=0; i<RANDOM_STRING_LENGTH; i++){
            int number = getRandomNumberforString();
            char ch = CHAR_LIST.charAt(number);
            randStr.append(ch);
        }
        return randStr.toString();
    }
     
    /**
     * This method generates random numbers
     * @return int
     */

    private int getRandomNumberforString() {
        int randomInt = 0;
        Random randomGenerator = new Random();
        randomInt = randomGenerator.nextInt(CHAR_LIST.length());
            return randomInt;
        }
    
     /**
     * This method generates random numbers
     * @return int
     */
 
    public int generateRandomNumber() {
        int i = 0;
        Random generator = new Random();
        i = generator.nextInt(100)*123+12345;
        return i;
        }

       private static final String lcode = "0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int RANDOM_LCODE_LENGTH = 8;
     
    /**
     * This method generates random License
     * @return
     * @throws IOException 
     */
    
    public String generateRandomLicense(){
        StringBuffer randStr = new StringBuffer();
        for(int i=0; i<RANDOM_LCODE_LENGTH; i++){
            int number = getRandomNumberforLicense();
            char ch = lcode.charAt(number);
            randStr.append(ch);
        }
        return randStr.toString();
    }
     
    /**
     * This method generates random License
     * @return int
     */

    private int getRandomNumberforLicense() {
        int randomInt = 0;
        Random randomGenerator = new Random();
        randomInt = randomGenerator.nextInt(lcode.length());
            return randomInt;
        }
    

    public String generateRandomCity(){
    	String cityarr[]={"Mumbai","Delhi","Bangalore","Kolkata","Chennai","Hyderabad","Ahmedabad","Pune","Surat","Kanpur","Jaipur","Lucknow","Nagpur","Patna","Indore","Thane","Bhopal","Ludhiana","Agra","Pimpri-Chinchwad"};
    	Random randomGenerator = new Random();
        String city = cityarr[randomGenerator.nextInt(cityarr.length)];
        return city;
    }
   
    
    public String generateRandomState(){
    	String countryarr[]={"Maharashtra","Delhi","Karnataka","West Bengal","Tamil Nadu","Andhra Pradesh","Gujarat","Maharashtra","Gujarat","Uttar Pradesh","Rajasthan","Uttar Pradesh","Maharashtra","Bihar","Madhya Pradesh","Maharashtra","Madhya Pradesh","Punjab","Uttar Pradesh","Maharashtra"};    	Random randomGenerator = new Random();
        String country = countryarr[randomGenerator.nextInt(countryarr.length)];
        return country;
    }
   
   public String generateRandomCountry(){
        String v="India";
        return v;
    }
   
   public String generateRandomCountryCode(){
        String v="+91";
        return v;
    }
   
   public String generateRandomEmail(){
        String v="er.praveen@gmail.com";
        return v;
    }
   
   public String generateRandomPhoneNumber(){
        String v="9827098270";
        return v;
    }
   
   public String generateRandomIpAddress(){
	   Random r = new Random();
       String i = (r.nextInt(254)+1)+"."+(r.nextInt(254)+1)+"."+(r.nextInt(254)+1)+"."+(r.nextInt(254)+1);
       return i;
   }
   
   public String generateRandomStockQuoteSymbol(){
       String v="NSE: MTNL";
       return v;
   }
   
}
