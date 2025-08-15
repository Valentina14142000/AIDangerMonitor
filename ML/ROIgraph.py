import matplotlib.pyplot as plt


years = [1, 2, 3, 4, 5]
roi_percentage = [10, 25, 45, 65, 85]


plt.figure(figsize=(8, 5))
plt.plot(years, roi_percentage, marker='o', linestyle='-', color='blue')


plt.title('ROI Growth Over Time')
plt.xlabel('Years')
plt.ylabel('Return on Investment (%)')
plt.grid(True)
plt.xticks(years)
plt.yticks(range(0, 101, 10))


plt.tight_layout()
plt.show()
