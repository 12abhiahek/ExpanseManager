package com.expense.ExpenseManager.util;

import com.expense.ExpenseManager.dto.ExpenseRequest;
import com.opencsv.CSVReader;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class CsvParserUtil {

    public static List<ExpenseRequest> parse(
            MultipartFile file) {

        List<ExpenseRequest> list = new ArrayList<>();

        try (CSVReader reader =
                     new CSVReader(
                             new InputStreamReader(
                                     file.getInputStream()))) {

            String[] line;
            reader.readNext(); // skip header

            while ((line = reader.readNext()) != null) {

                ExpenseRequest req = new ExpenseRequest();
                req.setDate(LocalDate.parse(line[0]));
                req.setAmount(Double.parseDouble(line[1]));
                req.setVendorName(line[2]);
                req.setDescription(line[3]);

                list.add(req);
            }

        } catch (Exception e) {
            throw new RuntimeException("CSV parsing failed");
        }

        return list;
    }
}
