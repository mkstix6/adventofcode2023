fn main() {
    let input = include_str!("./input.txt");
    // dbg!(input);
    let output = part1(input);
    dbg!(output);
}

fn split_lines(whole_text: &str) -> std::str::Lines<'_> {
    whole_text.lines()
}

fn filter_digits(line: &str) -> String {
    line.chars().filter(|c| c.is_digit(10)).collect()
}

fn get_first_and_last(digits: &str) -> i32 {
    let first = digits.chars().nth(0).unwrap();
    let last = digits.chars().last().unwrap();
    let both = format!("{first}{last}").to_string();
    let head_and_tail_number: i32 = both.parse::<i32>().expect("Not a valid number");
    return head_and_tail_number;
}

fn part1(whole_text: &str) -> i32 {
    // Manage provided input
    let input_lines = split_lines(whole_text);
    // dbg!(&input_lines);
    let all_digits: Vec<String> = input_lines.map(|line| filter_digits(line)).collect();
    // Process each line
    let digits_ends = all_digits.iter().map(|digits| get_first_and_last(digits));
    // Total
    let mut total: i32 = 0;
    for digits in digits_ends {
        total = total + digits;
    }
    return total;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn linetest01() {
        let result = get_first_and_last(&filter_digits("1abc2"));
        assert_eq!(result, 12)
    }

    #[test]
    fn linetest02() {
        let result = get_first_and_last(&filter_digits("pqr3stu8vwx"));
        assert_eq!(result, 38)
    }

    #[test]
    fn linetest03() {
        let result = get_first_and_last(&filter_digits("a1b2c3d4e5f"));
        assert_eq!(result, 15)
    }

    #[test]
    fn linetest04() {
        let result = get_first_and_last(&filter_digits("treb7uchet"));
        assert_eq!(result, 77)
    }

    #[test]
    fn filter_digits_01() {
        let result = filter_digits("afr52her75ndy6");
        assert_eq!(result, "52756");
    }

    #[test]
    fn totaltest01() {
        let result = part1(
            "1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet",
        );
        assert_eq!(result, 142)
    }
}
