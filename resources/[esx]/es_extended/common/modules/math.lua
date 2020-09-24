ESX.Math = {}

ESX.Math.Round = function(value, numDecimalPlaces)
	if numDecimalPlaces then
		local power = 10^numDecimalPlaces
		return math.floor((value * power) + 0.5) / (power)
	else
		return math.floor(value + 0.5)
	end
end

-- credit http://richard.warburton.it
ESX.Math.GroupDigits = function(value)
	local remain = value - math.floor(value);
	value = value - remain;

	local left,num,right = string.match(value,'^([^%d]*%d)(%d*)(.-)$')

	local result = left..(num:reverse():gsub('(%d%d%d)','%1' .. _U('locale_digit_grouping_symbol')):reverse())..right

	if _U('locale_decimal_symbol') then
		result = result.._U('locale_decimal_symbol')..math.floor(remain * 100)
	end

	return result
end

ESX.Math.Trim = function(value)
	if value then
		return (string.gsub(value, "^%s*(.-)%s*$", "%1"))
	else
		return nil
	end
end