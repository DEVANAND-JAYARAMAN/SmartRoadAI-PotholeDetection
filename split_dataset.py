import os
import random
import shutil

# Dataset paths
dataset_path = "dataset"

normal_path = os.path.join(dataset_path, "normal")
pothole_path = os.path.join(dataset_path, "potholes")

# Read all image names
normal_images = os.listdir(normal_path)
pothole_images = os.listdir(pothole_path)

# Shuffle images randomly
random.shuffle(normal_images)
random.shuffle(pothole_images)

# Split ratios
train_ratio = 0.8
val_ratio = 0.1
test_ratio = 0.1

# Function to split image list
def split_images(images):
    total = len(images)

    train_end = int(total * train_ratio)
    val_end = train_end + int(total * val_ratio)

    train = images[:train_end]
    val = images[train_end:val_end]
    test = images[val_end:]

    return train, val, test

# Split normal images
normal_train, normal_val, normal_test = split_images(normal_images)

# Split pothole images
pothole_train, pothole_val, pothole_test = split_images(pothole_images)

# Create folders
for split in ["train", "val", "test"]:
    for category in ["normal", "potholes"]:
        os.makedirs(
            os.path.join(dataset_path, split, category),
            exist_ok=True
        )

# Function to copy files
def copy_files(files, source_folder, destination_folder):
    for file in files:
        source = os.path.join(source_folder, file)
        destination = os.path.join(destination_folder, file)

        shutil.copy(source, destination)

# Copy Normal Images
copy_files(
    normal_train,
    normal_path,
    os.path.join(dataset_path, "train", "normal")
)

copy_files(
    normal_val,
    normal_path,
    os.path.join(dataset_path, "val", "normal")
)

copy_files(
    normal_test,
    normal_path,
    os.path.join(dataset_path, "test", "normal")
)

# Copy Pothole Images
copy_files(
    pothole_train,
    pothole_path,
    os.path.join(dataset_path, "train", "potholes")
)

copy_files(
    pothole_val,
    pothole_path,
    os.path.join(dataset_path, "val", "potholes")
)

copy_files(
    pothole_test,
    pothole_path,
    os.path.join(dataset_path, "test", "potholes")
)

print("Dataset split completed successfully!")

print(f"Normal Images: {len(normal_images)}")
print(f"Pothole Images: {len(pothole_images)}")

print("\nTrain:")
print(f"Normal: {len(normal_train)}")
print(f"Potholes: {len(pothole_train)}")

print("\nValidation:")
print(f"Normal: {len(normal_val)}")
print(f"Potholes: {len(pothole_val)}")

print("\nTest:")
print(f"Normal: {len(normal_test)}")
print(f"Potholes: {len(pothole_test)}")