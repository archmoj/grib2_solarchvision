package grib2_solarchvision;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

class AppTest {
    @Test
    void testAddition() {
        int result = 2 + 2;
        assertEquals(4, result, "2 + 2 should equal 4");
    }

    @Test
    public void testApplicationHasMainFunction() {
        try {
            // Replace with your actual main application class path
            Class<?> clazz = Class.forName("grib2_solarchvision.App");

            // Search for the main method with String[] arguments
            Method mainMethod = clazz.getMethod("main", String[].class);

            // Verify the modifiers: must be public and static
            int modifiers = mainMethod.getModifiers();
            assertTrue(Modifier.isPublic(modifiers), "main method must be public");
            assertTrue(Modifier.isStatic(modifiers), "main method must be static");

            // Verify return type is void
            assertTrue(mainMethod.getReturnType() == void.class, "main method must return void");

            System.out.println("Success: Valid main function detected!");
        } catch (ClassNotFoundException e) {
            fail("Application main class not found: " + e.getMessage());
        } catch (NoSuchMethodException e) {
            fail("The application class does not have a 'public static void main(String[] args)' method.");
        }
    }
}
